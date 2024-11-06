import { forwardRef, useEffect, useRef } from "react";
import NotificationModal from "components/Modal/Notification/NotificationModal";
import tw, { styled } from "twin.macro";
import '../style.css'

const Title = styled.h3(() => [
  `color: var(--color-primary);
text-align: center;
font-family: Barlow Condensed;
font-size: 64px;
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
  tw`mt-[12px] break-all`,
]);

export const SimpleIconNotification = forwardRef(
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
    },
    ref
  ) => {
    const refm = useRef();

    useEffect(() => {
      ref.current = refm.current;
    }, [ref]);

    return (
      update && (
        <NotificationModal ref={refm} onClose={onClose}>
          {{
            content: (
              <>
                <div className="simple-notification-modal-content w-[400px]">
                  <div className="simple-notification-content flex flex-col items-center pt-[3px] pb-[12px]">
                    <Title className="simple-content-title">{title}</Title>
                    {Icon && (
                      <div className="simple-content-icon">
                        <Icon />
                      </div>
                    )}
                    <Subtitle className="simple-content-subtitle">
                      {subtitle}
                    </Subtitle>
                    {prompt}
                    {confirm}
                    <div>{children}</div>
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
