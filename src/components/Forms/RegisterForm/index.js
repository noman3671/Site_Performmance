import "./style.scss";
import Store from "components/Modal/ModalStore";

import { useEffect, useState } from "react";
import { FormInput } from "components/Inputs";
import Button from "components/Buttons";
import { Link, useLocation, useNavigate } from "react-router-dom-middleware";
import { FormProvider, useForm } from "react-hook-form";
import { equalTo, messages } from "utils/validationErrorMessages";
import { compileTemplate } from "utils";
import GoogleIcon from "assets/icons/social/Google.svg?react";
import FbIcon from "assets/icons/social/RegisterFacebook.svg?react";
import MicrosoftIcon from "assets/icons/social/Microsoft.svg?react";
import UserIcon from "assets/icons/user.svg?react";
import MailIcon from "assets/icons/mail.svg?react";
import LockIcon from "assets/icons/lock.svg?react";

import {
  autoSignIn,
  confirmSignUp,
  resendSignUpCode,
  signUp,
} from "aws-amplify/auth";
import ConfirmSignUpForm from "../ConfirmSignUpForm";
import { createToast } from "utils/Toast";
import { useLoggedIn } from "context/LoggedInContext";
import { useScrollContext } from "context/ScrollContext";
import { ClientPhoneIcon } from "../../Icons";
import { useModalContext } from "context/ModalContext";

const Toast = createToast();

const RegisterForm = () => {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      given_name: "",
      family_name: "",
      email: "",
      number: "+1",
      password: "",
      repeat_password: "",
    },
  });

  const handlePhoneNumberChange = (event) => {
    let value = event.target.value.replace(/\D/g, "");

    if (value.startsWith("1")) {
      value = value.slice(1);
    }

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    if (value.length > 6) {
      value = `+1 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
        6
      )}`;
    } else if (value.length > 3) {
      value = `+1 (${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 0) {
      value = `+1 (${value}`;
    } else {
      value = "+1";
    }

    methods?.setValue("number", value);
  };

  const {
    toggleModal,
    closeModal,
    passwordVisibility,
    togglePasswordVisibility,
  } = useModalContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollFunctions } = useScrollContext();
  const { setIsAction, fetchUser, isAction, setIsOpen } = useLoggedIn();
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [isError, setIsError] = useState("");
  const [countdown, setCountdown] = useState(120);
  const [showCountDown, setShowCountDown] = useState(true);

  const onHandleClickLogin = async (event) => {
    event.preventDefault();
    closeModal("isRegisterModalOpen");
    toggleModal("isLoginModalOpen");
  };

  useEffect(() => {
    let interval;
    if (newUser) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) =>
          prevCountdown > 0 ? prevCountdown - 1 : 0
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [newUser]);

  useEffect(() => {
    if (countdown === 0) {
      setShowCountDown(false);
    }
  }, [countdown]);

  const handleResendCode = async () => {
    try {
      resendSignUpCode({ username: email });
      setShowCountDown(true);
      setCountdown(120);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message?.toString() || "Undefined error",
      });
    }
  };

  const onHandleSignUp = async (data) => {
    try {
      setLoading(true);

      const formattedPhoneNumber = data.number?.replace(/[^\d]/g, "");

      if (newUser) {
        const response = await confirmSignUp({
          username: email,
          confirmationCode: data?.prompt_code,
        });
        if (response?.isSignUpComplete) {
          const res = await autoSignIn();
          if (res) {
            await fetchUser();
          }
          Store.openSimpleSuccess({
            title: "SUCCESS!",
            subtitle: "Registration completed successfully",
          });
          closeModal("isRegisterModalOpen");
          Store.closeAll();
          if (isAction === "BookNow") {
            setIsOpen(true);
          } else if (isAction === "createHorse") {
            navigate("/user/horses");
          } else {
            setIsAction("SignUp");
          }
        }
      } else {
        setEmail(data.email);

        const response = await signUp({
          username: data.email,
          password: data.password,
          options: {
            userAttributes: {
              email: data.email,
              given_name: data.given_name,
              family_name: data.family_name,
              phone_number: `+${formattedPhoneNumber}`,
            },
            autoSignIn: true,
          },
        });

        if (response?.nextStep?.signUpStep === "CONFIRM_SIGN_UP") {
          setNewUser(true);
          setIsError("");
          return;
        } else {
          setIsError("Fail: Other confirmation methods");
        }
      }
    } catch (error) {
      setIsError(error.message?.toString() || "Undefined error");
    } finally {
      setLoading(false);
    }
  };

  const renderConfirmationForm = () => {
    return (
      <ConfirmSignUpForm
        showCountDown={showCountDown}
        countdown={countdown}
        disabled={countdown > 0}
        onResend={handleResendCode}
        loading={loading}
        isError={isError}
      />
    );
  };

  const renderForm = () => {
    return (
      <div className="register-modal-content">
        <div className="register-content">
          <div className="register-content-form">
            <FormInput
              className="create-account-form-fields__field"
              name="given_name"
              label={"First name"}
              icon={<UserIcon />}
              placeholder={"Your full name"}
              required={true}
              validateOnChange={false}
              validations={{ required: true }}
            ></FormInput>
            <FormInput
              className="create-account-form-fields__field"
              name="family_name"
              icon={<UserIcon />}
              label={"Last name"}
              placeholder={"Your last name"}
              required
              validateOnChange={false}
            ></FormInput>
            <FormInput
              className="register-content-form__field"
              label={"Email"}
              icon={<MailIcon />}
              name={"email"}
              placeholder={"example@example.com"}
              validateOnChange={false}
              validations={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
            ></FormInput>
            <FormInput
              className="register-content-form__field"
              icon={<ClientPhoneIcon className="!text-transparent" />}
              type={"tel"}
              label={"Phone Number"}
              name={"number"}
              required
              placeholder={"+14844578306"}
              validateOnChange={false}
              validations={{
                required: true,
                pattern: {
                  value:
                    /^(?:\+1\s?)?\(?([2-9][0-8][0-9])\)?[-.●\s]?([2-9][0-9]{2})[-.●\s]?([0-9]{4})$/,
                  message: "Invalid phone number format",
                },
              }}
              onChange={handlePhoneNumberChange}
            ></FormInput>

            <FormInput
              className="register-content-form__field"
              type={"password"}
              icon={<LockIcon />}
              label={"Password"}
              name={"password"}
              validateOnChange={false}
              required
              placeholder={"Enter password"}
              validations={{
                minLength: 8,
                maxLength: 20,
                shouldContainsSymbol: 1,
                shouldContainsLowerCaseCharacters: true,
                shouldContainsUpperCaseCharacters: true,
              }}
              showEyeIcon
              showPassword={passwordVisibility.registerPassword}
              onToggleShowPassword={() =>
                togglePasswordVisibility("registerPassword")
              }
            ></FormInput>
            <FormInput
              className="register-content-form__field"
              type={"password"}
              label={"Repeat password"}
              validateOnChange={false}
              icon={<LockIcon />}
              validations={{
                equalTo: equalTo(
                  "password",
                  compileTemplate(messages.equalTo, { attribute: "password" })
                ),
              }}
              name={"repeat_password"}
              required
              placeholder={"Repeat password"}
              showEyeIcon
              showPassword={passwordVisibility.repeatPassword}
              onToggleShowPassword={() =>
                togglePasswordVisibility("repeatPassword")
              }
            ></FormInput>
          </div>
          <div className="register-content-submit mt-[16px]">
            <Button
              loading={loading}
              type="submit"
              className={"modal_form_btn"}
              primary
              whiteOutline
            >
              Join Now
            </Button>
            <p className="text-red-400 error-text">{isError && isError}</p>
            <span className={"register-content-submit__text"}>
              Have an account already?{" "}
              <Link
                onClick={onHandleClickLogin}
                className={"font-bold underline text-primary"}
                to={"/user/horses"}
              >
                Log in
              </Link>
            </span>
          </div>
          <div className="social_buttons">
            <Button
              primary
              whiteOutline
              transparent
              AppendIcon={<FbIcon className="mt-[-5px]" />}
            >
              Continue with Facebook
            </Button>
            <Button
              primary
              whiteOutline
              transparent
              AppendIcon={<GoogleIcon className="mt-[-5px]" />}
            >
              Continue with Google
            </Button>
            <Button
              primary
              whiteOutline
              transparent
              AppendIcon={<MicrosoftIcon className=" mt-[-5px]" />}
            >
              Continue with Microsoft
            </Button>
          </div>
          <div className="register-content-links">
            <a
              // onClick={() => {
              //   if (location.pathname === "/") {
              //     closeModal("isRegisterModalOpen");
              //     navigate("/terms-and-conditions");
              //     setTimeout(() => {
              //       scrollFunctions.scrollToSecFour();
              //     }, 0);
              //   } else {
              //     scrollFunctions.scrollToSecFour();
              //   }
              // }}
              onClick={() => {
                closeModal("isRegisterModalOpen");
                navigate("/terms-and-conditions");
              }}
              className={"text-secondary cursor-pointer"}
            >
              Terms & Conditions
            </a>
            <a
              onClick={() => {
                closeModal("isRegisterModalOpen");
                navigate("/privacy-policy");
              }}
              className={"text-secondary cursor-pointer"}
            >
              Privacy policy
            </a>
            <a
              onClick={() => {
                if (location.pathname === "/") {
                  closeModal("isRegisterModalOpen");
                  navigate("/partner");
                  setTimeout(() => {
                    scrollFunctions.scrollToSecFour();
                  }, 0);
                } else {
                  scrollFunctions.scrollToSecFour();
                }
              }}
              className={"text-secondary cursor-pointer"}
            >
              Contact us
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onHandleSignUp)}>
          {newUser === null ? renderForm() : renderConfirmationForm()}
        </form>
      </FormProvider>
    </>
  );
};

export default RegisterForm;
