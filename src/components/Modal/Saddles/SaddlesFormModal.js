import { forwardRef, useEffect, useRef } from "react";
import NotificationModal from "components/Modal/Notification/NotificationModal";
import tw, { css, styled } from "twin.macro";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "components/Inputs";
import ModalStore from "components/Modal/ModalStore";
import { createHorse } from "services/horses.ts";
import UploadFormRow from "components/Inputs/UploadFormRow";
import Button from "components/Buttons";
import { ActionsContext, useActionsContext } from "context/ActionsContext";
import DatePicker from "components/DatePicker/DatePicker";
import { dateToExtendedISODate } from "aws-date-utils";

export const SaddlesFormModal = forwardRef(
  (
    {
      Icon,
      title,
      subtitle,
      prompt,
      confirm,
      children,
      update = true,
      onClose,
      onHorseCreated = () => {},
    },
    ref
  ) => {
    const refm = useRef();
    const methods = useForm({
      defaultValues: {
        name: "",
        dob: "",
        color: "",
        photo: null,
      },
    });

    const { actionState, changeActionState } = useActionsContext();

    useEffect(() => {
      ref.current = refm.current;
    }, [ref]);

    const onSubmit = async (data) => {
      changeActionState({ submiting: true });
      await createHorse({
        ...data,
        dob: dateToExtendedISODate(data.dob),
      })
        .then((response) => {
          ModalStore.openSimpleSuccess({
            title: "Horse successfully added",
          });
          onHorseCreated(data);
        })
        .catch((error) => {
          ModalStore.openSimpleError({
            title: "Fail adding horse",
            subtitle:
              error.errors?.[0]?.message?.toString() || "Undefined error",
            onCancel: ref.current.open,
          });
        });
      changeActionState({ submiting: false });
    };

    return (
      update && (
        <NotificationModal
          className={"!w-auto !px-[57px]"}
          ref={refm}
          onClose={onClose}
        >
          {{
            content: (
              <>
                <div css={[classes]} className="horse-form-modal-content">
                  <div className="horse-form-content flex flex-col items-center pt-[3px] pb-[12px]">
                    <Title className="horse-form-title">{title}</Title>
                    <div className="horse-form">
                      <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                          <div className="flex gap-[32px] items-center">
                            <UploadFormRow
                              preview={true}
                              previewSize={"113px"}
                              name="photo"
                              label={"Horse photo"}
                              className={"create-account-form-fields__field "}
                              compact
                              required={false}
                              immediateUpload
                            ></UploadFormRow>
                            <div className="create-account-form-fields flex flex-col gap-[24px]">
                              <FormInput
                                className="create-account-form-fields__field"
                                name="name"
                                label={"Horse name"}
                                placeholder={"Enter horse name"}
                                required
                              ></FormInput>
                              <DatePicker
                                className="create-account-form-fields__field"
                                name="dob"
                                label={"DOB"}
                                placeholder={"DOB"}
                                required
                              ></DatePicker>
                              <FormInput
                                className="create-account-form-fields__field"
                                name="color"
                                label={""}
                                placeholder={"Enter horse color"}
                                required
                              ></FormInput>
                            </div>
                          </div>
                          <div className="horse-form-actions">
                            <ActionsContext.Consumer>
                              {({ actionState, changeActionState }) => (
                                <>
                                  <Button
                                    onClick={() => refm.current?.close()}
                                    type={"submit"}
                                    className={"b-button w-[159px]"}
                                    primaryOutline
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    loading={actionState.submiting}
                                    type={"submit"}
                                    className={"b-button w-[159px]"}
                                    primary
                                    whiteOutline
                                  >
                                    Submit
                                  </Button>
                                </>
                              )}
                            </ActionsContext.Consumer>
                          </div>
                        </form>
                      </FormProvider>
                    </div>
                  </div>
                </div>
              </>
            ),
          }}
        </NotificationModal>
      )
    );
  }
);

const Title = styled.h3(() => [
  `color: var(--color-text);
text-align: center;
font-family: Abhaya Libre;
font-size: 32px;
font-style: normal;
font-weight: 700;
line-height: 41px;`,
]);

const classes = css`
  .horse-form {
    ${tw`pt-[34px]`}
  }

  .horse-form-actions {
    ${tw`flex mt-[42px] gap-[16px]`}
  }
`;
