import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom-middleware";
import MailIcon from "assets/icons/mail.svg?react";
import LockIcon from "assets/icons/lock.svg?react";
import { confirmResetPassword, resendSignUpCode, resetPassword } from "aws-amplify/auth";
import { equalTo, messages } from "utils/validationErrorMessages";
import { compileTemplate } from "utils";
import { FormInput } from "components/Inputs";
import Button from "components/Buttons";
import { createToast } from "utils/Toast";
import { useModalContext } from "context/ModalContext";
import { useQuery } from "@apollo/client";
import { CHECK_EMAIL_EXISTENCE } from "../../../apollo/queries/emailExistence";

const Toast = createToast();

const ForgotPasswordForm = () => {
  const methods = useForm({ mode: "onBlur" });
  const {
    toggleModal,
    closeModal,
    passwordVisibility,
    togglePasswordVisibility,
  } = useModalContext();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [forgetPasswordCodeSent, setForgetPasswordCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(120);
  const [showCountDown, setShowCountDown] = useState(true);

  const { data, loading: queryLoading, refetch } = useQuery(CHECK_EMAIL_EXISTENCE, {
    variables: { email },
    skip: true,
  });

  useEffect(() => {
    let interval;
    if (forgetPasswordCodeSent) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => (prevCountdown > 0 ? prevCountdown - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [forgetPasswordCodeSent]);

  useEffect(() => {
    if (countdown === 0) {
      setShowCountDown(false);
    }
  }, [countdown]);

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: email });
      setShowCountDown(true);
      setCountdown(120);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message?.toString() || "Undefined error",
      });
    }
  };

  const checkEmailExistence = async (email) => {
    setLoading(true);
    try {
      const emailExists = await refetch({ email });
      if (!emailExists.data.isEmailExist) {
        Toast.fire({
          icon: "error",
          title: "Email does not exist",
        });
        setLoading(false);
        return false;
      }
      return true;
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message?.toString() || "Undefined error",
      });
      setLoading(false);
      return false;
    }
  };

  const onHandleForgotPassword = async (data) => {
    if (!forgetPasswordCodeSent) {
      const emailValid = await checkEmailExistence(data.email);
      if (emailValid) {
        setEmail(data.email);
        try {
          const response = await resetPassword({ username: data.email });
          if (response?.nextStep?.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE") {
            setForgetPasswordCodeSent(true);
          } else if (response?.nextStep?.resetPasswordStep === "DONE") {
            Toast.fire({
              icon: "success",
              title: "Successfully reset password.",
            });
          }
        } catch (error) {
          Toast.fire({
            icon: "error",
            title: error.message?.toString() || "Undefined error",
          });
        }
      }
    } else {
      try {
        await confirmResetPassword({
          username: email,
          confirmationCode: data.code,
          newPassword: data.newPassword,
        });

        Toast.fire({
          icon: "success",
          title: "Password Reset Successfully",
        });
        closeModal("isForgotPasswordModalOpen");
        setTimeout(() => {
          toggleModal("isLoginModalOpen");
        }, 200);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error.message?.toString() || "Undefined error",
        });
      }
    }
    setLoading(false);
  };

  const onHandleLoginClick = (event) => {
    event.preventDefault();
    closeModal("isForgotPasswordModalOpen");
    toggleModal("isLoginModalOpen");
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const renderForm = () => (
    <div className="register-modal-content">
      <div className="register-content">
        <div className="register-content-form">
          <FormInput
            name="email"
            label="Email"
            icon={<MailIcon />}
            validateOnChange={false}
            validations={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            placeholder="example@example.com"
          />
        </div>
        <div className="register-content-submit mt-[19px]">
          <Button
            whiteOutline
            type="submit"
            className="modal_form_btn"
            primary
            loading={loading}
          >
            Send Code
          </Button>
          <span className="register-content-submit__text">
            Have an account already?{" "}
            <Link
              onClick={onHandleLoginClick}
              className="font-bold underline text-primary"
              to="/"
            >
              Log in
            </Link>
          </span>
        </div>
        <div className="register-content-links">
          <Link className="text-secondary" to="/">
            Terms of service
          </Link>
          <Link className="text-secondary" to="/">
            Privacy policy
          </Link>
          <Link className="text-secondary" to="/">
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );

  const renderPasswordResetForm = () => (
    <div className="register-content">
      <div className="register-content-form">
        <FormInput
          name="code"
          label="Code"
          placeholder="Enter code"
          required
          className="mt-4"
        />
        <FormInput
          type="password"
          name="newPassword"
          label="New Password"
          validateOnChange={false}
          icon={<LockIcon />}
          required
          placeholder="Enter password"
          validations={{
            minLength: 8,
            maxLength: 20,
          }}
          showEyeIcon
          showPassword={passwordVisibility.newPassword}
          onToggleShowPassword={() => togglePasswordVisibility("newPassword")}
        />
        <FormInput
          type={"password"}
          label={"Repeat password"}
          validateOnChange={false}
          icon={<LockIcon />}
          validations={{
            equalTo: equalTo(
              "newPassword",
              compileTemplate(messages.equalTo, { attribute: "newPassword" })
            ),
          }}
          name={"repeat_password"}
          required
          placeholder={"Repeat password"}
          showEyeIcon
          showPassword={passwordVisibility.repeatNewPassword}
          onToggleShowPassword={() =>
            togglePasswordVisibility("repeatNewPassword")
          }
        ></FormInput>
      </div>
      <div className="register-content-submit mt-[19px]">
        <Button
          type="button"
          className={`modal_form_btn ${countdown > 0 && "!bg-gray-300"}`}
          disabled={countdown > 0}
          onClick={handleResendCode}
        >
          Resend code
        </Button>
        {showCountDown && (
          <span className="timer-text">{formatTime(countdown)}</span>
        )}
        <Button
          whiteOutline
          type="submit"
          className="modal_form_btn"
          primary
          loading={loading}
        >
          Confirm
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onHandleForgotPassword)}>
          {!forgetPasswordCodeSent ? renderForm() : renderPasswordResetForm()}
        </form>
      </FormProvider>
    </>
  );
};

export default ForgotPasswordForm;
