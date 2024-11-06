import React from "react";
import HorseIcon from "assets/icons/notifications/horse-notification-success.svg?react";
import { FormInput } from "components/Inputs";
import Button from "components/Buttons";
import tw, { styled } from "twin.macro";

const Title = styled.h3(() => [
  `color: var(--color-primary);
  text-align: center;
  font-family: Barlow Condensed;
  text-transform: uppercase;
  font-style: normal;
  font-weight: 700;
  line-height: 110%;`,
  tw`mt-[19px]`,
]);

const Subtitle = styled.span(() => [
  `color: #343434;
text-align: center;
font-family: Montserrat;
font-size: 17px;
font-style: normal;
font-weight: 400;
line-height: 120%; `,
  tw`mt-[12px] w-[42 0px] `,
]);

const ConfirmSignUpForm = ({
  countdown,
  showCountDown,
  disabled,
  onResend,
  loading,
  isError,
}) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      <div className="simple-notification-modal-content ">
        <div className="simple-notification-content flex flex-col items-center pt-[3px] pb-[12px]">
          <Title className="simple-content-title text-[40px]">
            Confirm your email address
          </Title>
          <div className="simple-content-icon">
            <HorseIcon />
          </div>
          <Subtitle className="simple-content-subtitle w-[420px]">
            An email with a confirmation code has been sent to the specified
            email address, enter it below
          </Subtitle>
          <FormInput
            autoFocus
            className="create-account-form-fields__field mt-[10px]"
            name="prompt_code"
            label="Code"
            placeholder={"Enter code"}
            validations={{
              required: true,
            }}
          ></FormInput>
          <p className="text-red-400 error-text">{isError && isError}</p>
          <div className="flex flex-col items-center">
            <Button
              type="button"
              className={`modal_form_btn ${disabled && "!bg-gray-300"} mt-4`}
              disabled={disabled}
              onClick={onResend}
            >
              Resend code
            </Button>
            {showCountDown && (
              <span className="timer-text">{formatTime(countdown)}</span>
            )}
            <Button
              whiteOutline
              type="submit"
              className="modal_form_btn !mt-4"
              loading={loading}
              primary
            >
              Confirm
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmSignUpForm;
