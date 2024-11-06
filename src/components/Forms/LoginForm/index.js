import React from "react";
import { useState } from "react";
import { FormInput } from "components/Inputs";
import Button from "components/Buttons";
import { Link, useLocation, useNavigate } from "react-router-dom-middleware";
import { FormProvider, useForm } from "react-hook-form";
import {
  signInWithRedirect,
  signIn,
  confirmSignUp,
  resendSignUpCode,
} from "aws-amplify/auth";
import MailIcon from "assets/icons/mail.svg?react";
import LockIcon from "assets/icons/lock.svg?react";
import GoogleIcon from "assets/icons/social/Google.svg?react";
import FbIcon from "assets/icons/social/RegisterFacebook.svg?react";
import MicrosoftIcon from "assets/icons/social/Microsoft.svg?react";
import ConfirmSignUpForm from "../ConfirmSignUpForm";
import { createToast } from "utils/Toast";
import { useLoggedIn } from "context/LoggedInContext";
import { useModalContext } from "context/ModalContext";
import { useScrollContext } from "context/ScrollContext";
import { gql, useLazyQuery } from "@apollo/client";
import { listUserHorses } from "apollo/queries/horses";

const Toast = createToast();

const LoginForm = ({ closeLoginModal = () => {} }) => {
  const { scrollFunctions } = useScrollContext();
  const {
    toggleModal,
    closeModal,
    passwordVisibility,
    togglePasswordVisibility,
  } = useModalContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { clientData, fetchUser, setIsAction, isAction, setIsOpen } =
    useLoggedIn();
  console.log({ clientData });

  const methods = useForm({
    mode: "onBlur",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmSignUpShow, setIsConfirmSignUpShow] = useState(null);
  const [email, setEmail] = useState("");

  const [fetchListHorses] = useLazyQuery(gql(listUserHorses));

  const onHandleForgotPasswordClick = (event) => {
    event.preventDefault();
    closeModal("isLoginModalOpen");
    toggleModal("isForgotPasswordModalOpen");
  };

  const onHandleSignIn = async (data) => {
    try {
      setLoading(true);
      if (isConfirmSignUpShow) {
        const response = await confirmSignUp({
          username: email,
          confirmationCode: data?.prompt_code,
        });
        if (response?.isSignUpComplete) {
          Toast.fire({
            icon: "success",
            title: "Registration completed now you can login",
          });
          setIsConfirmSignUpShow(null);
        }
      } else {
        setEmail(data?.email);
        const response = await signIn({
          username: data?.email,
          password: data?.password,
        });
        if (response.isSignedIn) {
          await fetchUser();
          if (klaviyo) {
            klaviyo.push([
              "identify",
              {
                email: clientData?.user?.email,
                $first_name: clientData?.user?.firstName,
                $last_name: clientData?.user?.lastName,
              },
            ]);

            klaviyo.push(["track", "Active on Site"]);
          }
          if (isAction === "BookNow") {
            setIsOpen(true);
          } else if (isAction === "createHorse") {
            const horsesData = await fetchListHorses({
              fetchPolicy: "network-only",
            });
            if (horsesData?.data?.listUserHorses?.count > 0) {
              navigate("/cactus");
            } else {
              navigate("/user/horses");
            }
          } else {
            setIsAction("login");
          }
        } else if (response?.nextStep?.signInStep === "CONFIRM_SIGN_UP") {
          await resendSignUpCode({ username: data?.email });
          setIsConfirmSignUpShow(true);
          Toast.fire({
            icon: "success",
            title:
              "VERIFICATION: CHECK YOUR EMAIL AND ENTER CONFIRMATION CODE ",
          });
        } else {
          Toast.fire({
            icon: "warning",
            title: "NEED ADDITIONAL CONFIRMING",
          });
        }
      }
      closeLoginModal();
    } catch (error) {
      setErrorMessage(error.message || "Undefined error");
      // Toast.fire({
      //   icon: "error",
      //   title: error.message || "Undefined error",
      // });
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => {
    return (
      <div className="register-modal-content">
        <div className="register-content">
          <div className="register-content-form">
            <FormInput
              className="register-content-form__field"
              label={"Email"}
              icon={<MailIcon />}
              name="email"
              validateOnChange={false}
              validations={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              placeholder={"example@example.com"}
            ></FormInput>
            <FormInput
              className="register-content-form__field"
              label={"Password"}
              icon={<LockIcon />}
              type="password"
              name="password"
              placeholder={"Enter password"}
              required
              validateOnChange={false}
              showEyeIcon
              showPassword={passwordVisibility.password}
              onToggleShowPassword={() => togglePasswordVisibility("password")}
            ></FormInput>
          </div>

          <div className="register-content-submit mt-[22px]">
            {errorMessage && (
              <p className="error-text text-red-500 text-lg font-medium ">
                {errorMessage}
              </p>
            )}
            <Button
              type="submit"
              loading={loading}
              className={"modal_form_btn"}
              primary
              whiteOutline
              onClick={methods.handleSubmit(onHandleSignIn)}
            >
              Login
            </Button>
            <span className={"register-content-submit__text"}>
              Forgot password?{" "}
              <Link
                to={"#"}
                onClick={onHandleForgotPasswordClick}
                className={"font-bold underline text-primary"}
              >
                Click here
              </Link>
            </span>
          </div>
          <div className="social_buttons">
            <Button
              whiteOutline
              primary
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
              onClick={(e) => {
                e.preventDefault();
                signInWithRedirect({
                  provider: "Google",
                  customState: "shopping-cart",
                });
              }}
            >
              Continue with Google
            </Button>
            <Button
              primary
              transparent
              AppendIcon={<MicrosoftIcon className=" mt-[-5px]" />}
            >
              Continue with Microsoft
            </Button>
          </div>
          <div className="register-content-links">
            <Link to="/terms-and-conditions" className={"text-secondary"}>
              Terms of service
            </Link>
            <Link to="/privacy-policy" className={"text-secondary"}>
              Privacy policy
            </Link>
            <a
              onClick={() => {
                if (location.pathname === "/") {
                  closeModal("isLoginModalOpen");
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

  const renderConfirmSignUpForm = () => {
    return <ConfirmSignUpForm loading={loading} />;
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onHandleSignIn)}>
          {isConfirmSignUpShow === null
            ? renderForm()
            : renderConfirmSignUpForm()}
        </form>
      </FormProvider>
    </>
  );
};

export default LoginForm;
