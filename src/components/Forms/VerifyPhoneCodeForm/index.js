import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  confirmUserAttribute,
  resendSignUpCode,
  sendUserAttributeVerificationCode,
} from "aws-amplify/auth";
import { FormInput } from "components/Inputs";
import Button from "components/Buttons";
import { createToast } from "utils/Toast";
import { useModalContext } from "context/ModalContext";
import { gql, useMutation } from "@apollo/client";
import { UPDATE_USER } from "apollo/mutations/Client";
import ModalStore from "components/Modal/ModalStore";

const Toast = createToast();

const VerifyPhoneCodeForm = () => {
  const methods = useForm({
    mode: "onBlur",
    defaultValues: {
      code: "",
    },
  });
  const { closeModal, setEditFullName, setEditPhone, setEditAddress } = useModalContext();
  const [updateUser] = useMutation(gql(UPDATE_USER));
  const [loading, setLoading] = useState(false);
  const [verifyPhoneCode, setVerifyPhonecode] = useState(true);
  const [countdown, setCountdown] = useState(120);
  const [showCountDown, setShowCountDown] = useState(true);

  const VerifyCodeSubmit = async () => {
    try {
      await confirmUserAttribute({
        userAttributeKey: "phone_number",
        confirmationCode: methods.getValues()?.code,
      });
      await updateUser({
        variables: {
          input: {
            isPhoneVerified: true,
          },
        },
        refetchQueries: ["ClientQuery"],
      });
      closeModal("isVerifyPhoneCodeModalOpen");
      setEditFullName(false);
      setEditPhone(false);
      setEditAddress(false);
      ModalStore.openSimpleSuccess({
        title: "SUCCESS!",
        subtitle: "Phone verified successfully",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let interval;
    if (verifyPhoneCode) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) =>
          prevCountdown > 0 ? prevCountdown - 1 : 0
        );
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [verifyPhoneCode]);

  useEffect(() => {
    if (countdown === 0) {
      setShowCountDown(false);
    }
  }, [countdown]);

  const handleResendCode = async () => {
    try {
      await sendUserAttributeVerificationCode({
        userAttributeKey: "phone_number",
      });
      setShowCountDown(true);
      setCountdown(120);
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message?.toString() || "Undefined error",
      });
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const renderVerifyPhoneCodeForm = () => (
    <div className="register-content">
      <div className="register-content-form">
        <FormInput
          name="code"
          type="number"
          label="Code"
          placeholder="Enter code"
          required
          className="mt-4"
          onInput={(e) => {
            if (e.target.value.length > 6) {
              e.target.value = e.target.value.slice(0, 6);
            }
          }}
        />
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
        <form onSubmit={methods.handleSubmit(VerifyCodeSubmit)}>
          {verifyPhoneCode && renderVerifyPhoneCodeForm()}
        </form>
      </FormProvider>
    </>
  );
};

export default VerifyPhoneCodeForm;
