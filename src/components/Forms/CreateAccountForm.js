import { FormInput } from "components/Inputs";
import tw, { css } from "twin.macro";
import Button from "components/Buttons";
import UploadFormRow from "components/Inputs/UploadFormRow";
import { Link, useNavigate } from "react-router-dom-middleware";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import useFileThumbnail from "hooks/useFileThumbnail";
import {
  handleSignUp,
  handleSignUpConfirmation,
} from "services/authorization.ts";
import { equalTo, messages } from "utils/validationErrorMessages";
import { compileTemplate } from "utils";
import { SimpleIconNotification } from "components/Modal/Notification/SimpleIconNotification";
import ModalStore from "components/Modal/ModalStore";
import HorseIconFail from "assets/icons/notifications/simple-notification-hourse-fail-icon.svg?react";
import HorseIcon from "assets/icons/notifications/simple-notification-hourse-icon.svg?react";
import { autoSignIn, signOut } from "aws-amplify/auth";
import { useModalContext } from "context/ModalContext";

export const CreateAccountForm = ({ email, password }) => {
  const methods = useForm({
    defaultValues: {
      email: email,
      password: password,
      repeat_password: password,
    },
  });
  const { toggleModal } = useModalContext();
  const [picture, setPicture] = useState();
  const [loading, setLoading] = useState(false);
  const pictureThumbnail = useFileThumbnail(picture?.file);
  const navigate = useNavigate();

  const onHandleLoginClick = (event) => {
    event.preventDefault();
    toggleModal("isLoginModalOpen");
  };

  const onUploadedFinished = (successUploadedFiles, failUploadedFiles) => {
    if (failUploadedFiles.length) {
      alert("Fail while uploading image");
    } else {
      const picture = successUploadedFiles[0];
      setPicture(picture);
      methods.setValue("picture", picture.key);
    }
  };

  const handleSignUpComplete = async () => {
    ModalStore.open(
      <SimpleIconNotification
        Icon={HorseIcon}
        title={"Registration completed successfully"}
        subtitle={""}
      />
    );

    try {
      try {
        await signOut();
      } catch (error) {}
      await autoSignIn();
      if (klaviyo) {
        klaviyo.push([
          "identify",
          {
            email: methods.getValues("email"),
            $first_name: methods.getValues("given_name"),
            $last_name: methods.getValues("family_name"),
          },
        ]);

        klaviyo.push(["track", "Active on Site"]);
      }
    } catch (e) {}

    setTimeout(() => {
      navigate("/user/horses");
    }, 500);
  };

  const onConfirmSignUpHandler = async (
    code,
    email = methods.getValues("email")
  ) => {
    return handleSignUpConfirmation({ username: email, confirmationCode: code })
      .then((response) => {
        handeSignUpResponse(response);
      })
      .catch((error) => {
        const ref = ModalStore.open(
          <SimpleIconNotification
            Icon={HorseIconFail}
            title={"Confirmation email fail"}
            onClose={openConfirmSignUpModal}
            confirm={
              <Button
                onClick={async () => {
                  ref.current.close();
                }}
                className="modal_form_btn"
                primary
                whiteOutline
              >
                Ok
              </Button>
            }
            subtitle={error?.toString() || "Undefined error"}
          />
        );
      });
  };

  const openConfirmSignUpModal = () => {
    let code,
      loading = false;

    const c = () => {
      return (
        <SimpleIconNotification
          Icon={HorseIcon}
          title={"Confirm your email address"}
          onClose={openConfirmSignUpModal}
          subtitle={
            "An email with a confirmation code has been sent to the specified email address, enter it below"
          }
          prompt={
            <FormInput
              autoFocus
              onInput={(event) => (code = event.target.value)}
              className="mt-[20px]"
              name="prompt_code"
              label="Code"
              placeholder={"Enter code"}
              required
            ></FormInput>
          }
        >
          <Button
            onClick={async () => {
              loading = true;
              ref.current.rerender(c);
              await onConfirmSignUpHandler(code);
              loading = false;
            }}
            className="modal_form_btn"
            loading={loading}
            primary
            whiteOutline
          >
            Confirm
          </Button>
        </SimpleIconNotification>
      );
    };

    const ref = ModalStore.open(c());
  };

  const handeSignUpResponse = (response) => {
    if (response.isSignUpComplete) {
      return handleSignUpComplete();
    }

    if (response.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
      return openConfirmSignUpModal();
    } else {
      alert("Fail: Other confirmation methods");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    await handleSignUp(data)
      .then((response) => {
        handeSignUpResponse(response);
      })
      .catch((error) => {
        ModalStore.open(
          <SimpleIconNotification
            Icon={HorseIconFail}
            title={"Registration fail"}
            subtitle={error?.toString() || "Undefined error"}
          />
        );
      });
    setLoading(false);
  };

  return (
    <div
      css={[styles]}
      className={
        "create-account-form m-auto w-[637px] pt-[59px] pb-[50px] px-[108px] my-[90px]"
      }
    >
      <div className="create-account-form__title mb-[24px]">Create account</div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="create-account-form-fields flex flex-col gap-[24px]"
        >
          <FormInput
            className="create-account-form-fields__field"
            name="given_name"
            label={"First name"}
            placeholder={"Your full name"}
            required={true}
            validations={{ required: true }}
          ></FormInput>
          <FormInput
            className="create-account-form-fields__field"
            name="family_name"
            label={"Last name"}
            placeholder={"Your last name"}
            required
          ></FormInput>
          <FormInput
            className="create-account-form-fields__field mt-[40px]"
            name="phone_number"
            label={"Phone number"}
            placeholder={"Your number"}
            required
          ></FormInput>
          <FormInput
            className="create-account-form-fields__field"
            label={"Email"}
            name="email"
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
            className="create-account-form-fields__field"
            label={"Password"}
            type={"password"}
            validations={{
              minLength: 8,
              maxLength: 20,
              shouldContainsSymbol: 1,
              shouldContainsLowerCaseCharacters: true,
              shouldContainsUpperCaseCharacters: true,
            }}
            name="password"
            hidden={!!password}
            disabled={!!password}
            placeholder={"Enter password"}
            required={!password}
          ></FormInput>
          <FormInput
            className="create-account-form-fields__field"
            label={"Repeat Password"}
            type={"password"}
            name="repeat_password"
            hidden={!!password}
            disabled={!!password}
            placeholder={"Repeat password"}
            required={!password}
            validations={{
              equalTo: equalTo(
                "password",
                compileTemplate(messages.equalTo, { attribute: "password" })
              ),
            }}
          ></FormInput>
          <FormInput
            className="create-account-form-fields__field mt-[40px]"
            name="custom:country"
            label={"Country"}
            placeholder={"USA"}
            required
          ></FormInput>
          <FormInput
            className="create-account-form-fields__field mt-[40px]"
            name="custom:city"
            label={"City"}
            placeholder={"Washington"}
            required
          ></FormInput>
          <FormInput
            className="create-account-form-fields__field"
            name="custom:state"
            label={"State"}
            placeholder={"Washington DC"}
            required
          ></FormInput>
          <FormInput
            className="create-account-form-fields__field"
            name="address"
            label={"Address"}
            placeholder={"Street address"}
            required
          ></FormInput>
          {/*{picture && <FormInput value={picture.key} name="picture" type="text" hidden={true}/>}*/}
          <UploadFormRow
            preview={true}
            onUploadedFinished={onUploadedFinished}
            name="picture"
            label={"Profile photo"}
            className={"create-account-form-fields__field mt-[26px]"}
            onCancelFile={() => {
              setPicture(undefined);
              methods.setValue("picture", undefined);
            }}
            required={false}
            immediateUpload={true}
          >
            {{
              pictureThumbnail: pictureThumbnail ? (
                <img
                  css={[pictureThumbnailStyles]}
                  src={pictureThumbnail}
                  alt={"pictureThumbnail"}
                ></img>
              ) : null,
            }}
          </UploadFormRow>
          <div className="create-account-form-action mt-[24px] flex justify-center">
            <Button
              loading={loading}
              type={"submit"}
              className={"b-button w-[159px]"}
              primary
              whiteOutline
            >
              Sign up
            </Button>
          </div>
        </form>
      </FormProvider>
      <div className="create-account-form-bottom-text flex justify-center">
        <span className={"mt-[72px]"}>
          Have an account already?{" "}
          <Link
            onClick={onHandleLoginClick}
            className={"font-bold underline text-primary"}
            to={"/"}
          >
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
};

const pictureThumbnailStyles = css`
  height: 100%;
  width: 100%;
  object-fit: fill;
`;

const styles = css`
  border-radius: 12px;
  background: #fff;

  box-shadow: 0px 4px 64px 0px rgba(0, 0, 0, 0.07);
  // backdrop-filter: blur(10px);

  .create-account-form__title {
    color: var(--color-text);

    text-align: center;
    font-family: Abhaya Libre;
    font-size: 40px;
    font-style: normal;
    font-weight: 400;
    line-height: 48px; /* 120% */
  }

  & > .create-account-form-fields {
    @apply flex flex-col gap- [ 24 px ]
  foo: bar;
  }

  .create-account-form-bottom-text span {
    color: var(--color-text);

    font-family: Abhaya Libre;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 100% */

    a {
      color: var(--color-primary);
      font-family: Abhaya Libre;
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 16px;
      text-decoration-line: underline;
    }
  }
`;
