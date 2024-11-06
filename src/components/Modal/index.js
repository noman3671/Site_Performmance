import "./style.css";

import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import CloseIcon from "assets/icons/actions/close.svg?react";
import Store from "./ModalStore";

Modal.setAppElement("#root");

const ModalWrapper = (props) => {
  const {
    modalIsOpen,
    closeModal,
    title,
    isCloseIcon = false,
    children,
    className,
  } = props;
  const [wasOpened, setWasOpened] = useState(false);
  const [uid, setUid] = useState("");
  const [childrenVisible, setChildrenVisible] = useState(true);

  useEffect(() => {
    setUid(getUid());
  }, []);

  const forceUpdate = () => {
    setChildrenVisible(false);
    setChildrenVisible(true);
  };

  const afterOpenModal = () => {
    setWasOpened(true);
  };

  const getUid = () => {
    return (
      "modal_" + Date.now().toString(36) + Math.random().toString(36).substr(2)
    );
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 150,
    },
  };

  return (
    <div
      onClick={() => {
        if (location.pathname !== "/buy") {
          closeModal();
        }
      }}
    >
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        // onRequestClose={handleRequestClose}
        shouldCloseOnOverlayClick={true}
        style={customStyles}
        contentLabel="Modal"
        className={`notification-modal`}
        overlayClassName={`${
          location.pathname === "/buy"
            ? "notification-overlay backdrop-blur-[4px]"
            : location.pathname === "/signup"
            ? "custom-overlay" 
            : "notification-overlay"
        }`} 
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`notification-content ${
            location.pathname === "/buy" && "!p-[16px] sm:!p-[40px]"
          } no-scrollbar w-[500px] ${className}`}
        >
          <div className="notification-content__title">
            {title || children.title}
          </div>
          <div className="notification-content__body">
            <div className="notification-content-body">
              {childrenVisible &&
                (typeof children.content === "object" &&
                !children.content?.render ? (
                  children.content
                ) : (
                  <children.content></children.content>
                ))}
            </div>
          </div>
          {isCloseIcon && (
            <div
              onClick={closeModal}
              className="notification-content__close-icon"
            >
              <CloseIcon></CloseIcon>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export const ReactModals = () => {
  const [state, setState] = useState([...Store.components]);

  useEffect(() => {
    Store.setUpdateHandler((components) => {
      setState(components);
    });
  }, []);

  return (
    <>
      {state.map((item, index) => {
        const ModalComponent = item.component;

        if (typeof ModalComponent === "object" && !ModalComponent?.render) {
          return <ModalComponent.type {...ModalComponent.props} key={index} />;
        }

        return <ModalComponent key={index}></ModalComponent>;
      })}
    </>
  );
};

export default ModalWrapper;
