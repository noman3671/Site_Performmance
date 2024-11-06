import { forwardRef, useEffect, useRef } from "react";
import tw, { css, styled } from "twin.macro";
import { ActionsContext, useActionsContext } from "context/ActionsContext";
import { ScrollView } from "@aws-amplify/ui-react";
import Button from "components/Buttons";
import { SelectedHorseRadioIcon } from "components/Icons";
import S3ImageWrapper from "components/Wrapper/S3ImageWrapper";
import { useHorseStore } from "store/HorseStore";
import NotificationModal from "../Notification/NotificationModal";

export const ChangeSelectHorseModal = forwardRef(
  (
    {
      Icon,
      title = "Change horse",
      subtitle,
      prompt,
      confirm,
      children,
      update = true,
      onClose,
      horses = [],
      onHorseChanged = () => {},
    },
    ref
  ) => {
    const refm = useRef();
    const { selectedHorseForStore: currentSelectedHorse, action } =
      useHorseStore();

    const { changeActionState } = useActionsContext();

    useEffect(() => {
      ref.current = refm.current;
    }, [ref]);

    const onSubmit = async (data) => {
      changeActionState({ submiting: true });
      setTimeout(() => {
        onHorseChanged(currentSelectedHorse);
        changeActionState({ submiting: false });
        ref.current.close();
      }, 500);
    };

    useEffect(() => {
      if (!currentSelectedHorse && horses.length) {
        // action({type: 'setSelectedHorseForStore', payload: horses[0]})
      }
    }, [horses]);

    return (
      update && (
        <NotificationModal
          className={"!w-auto !px-[57px] !pr-[29px]"}
          ref={refm}
          onClose={onClose}
        >
          {{
            content: (
              <>
                <div css={[classes]} className="horse-form-modal-content">
                  <div className="horse-form-content flex flex-col items-center pt-[3px] pb-[12px]">
                    <Title className="horse-form-title">{title}</Title>
                    <div className="horses-list mt-[40px]">
                      <ScrollView height="282px" width="100%">
                        <div className={`flex flex-col gap-[20px] pr-[81px]`}>
                          {horses.map((horse, index) => {
                            return (
                              <div
                                key={index}
                                onClick={() =>
                                  action({
                                    type: "setSelectedHorseForStore",
                                    payload: horse,
                                  })
                                }
                                className={`horse-list-item cursor-pointer hover:opacity-60 flex ${
                                  currentSelectedHorse?.id === horse.id
                                    ? "horse-list-item--active"
                                    : ""
                                }`}
                              >
                                <div className="horse-list-item__image size-[120px] mr-[24px]">
                                  <S3ImageWrapper
                                    className={"object-contain"}
                                    imgKey={horse.photo}
                                  ></S3ImageWrapper>
                                  <SelectedHorseRadioIcon
                                    className={
                                      "horse-list-item__checked-icon !size-[24px]"
                                    }
                                  />
                                </div>
                                <div className="horse-list-item__info flex flex-col">
                                  <div className="horse-list-item-info">
                                    <span className="horse-list-item-info__name">
                                      {horse.name}
                                    </span>
                                    <div className="horse-list-item-info__wrapper flex">
                                      <div className="b-item-info-head">
                                        <span className={"b-item-info-span"}>
                                          DOB:
                                        </span>
                                        <span className={"b-item-info-span"}>
                                          Last scan:
                                        </span>
                                      </div>
                                      <div className="b-item-info-body">
                                        <span className={"b-item-info-span"}>
                                          {horse.dob}
                                        </span>
                                        <span className={"b-item-info-span"}>
                                          {horse.last_scan}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </ScrollView>
                    </div>
                    <div className="horse-form-actions">
                      <ActionsContext.Consumer>
                        {({ actionState }) => (
                          <>
                            <Button
                              disabled={!currentSelectedHorse}
                              onClick={onSubmit}
                              loading={actionState.submiting}
                              className={"b-button w-[158px]"}
                              primary
                            >
                              Submit
                            </Button>
                          </>
                        )}
                      </ActionsContext.Consumer>
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

  .horse-list-item__checked-icon > * {
    fill: var(--color-secondary) !important;
  }

  .horse-list-item {
    .horse-list-item__checked-icon {
      fill: var(--color-secondary) !important;
      display: none;
      position: absolute;
      top: 10px;
      right: 10px;
    }
  }

  .horse-list-item--active {
    & {
      color: var(--color-secondary);
      fill: var(--color-secondary);
    }
    .horse-list-item__image {
      background: transparent;
      border: 1px solid var(--color-secondary);
    }

    .horse-list-item__checked-icon {
      display: block;
    }

    .horse-list-item-info__name {
      color: var(--color-secondary);
    }
  }

  .b-item-info-span {
    color: var(--color-text);
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 28px; /* 200% */
  }

  .horse-list-item-info__name {
    color: var(--color-text);
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: 18px; /* 100% */
  }

  .horse-list-item-info {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .horse-list-item__image {
    position: relative;
    border-radius: 16px;
    background: linear-gradient(
        0deg,
        rgba(202, 202, 202, 0.4) 0%,
        rgba(202, 202, 202, 0.4) 100%
      )
      lightgray 50% / cover no-repeat;

    display: flex;
    padding: 1px;
    img {
      border-radius: 16px;
      margin: auto;
      max-height: 100%;
      max-width: 100%;
    }
  }
`;
