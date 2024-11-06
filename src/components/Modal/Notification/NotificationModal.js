import "../style.css";

import Modal from "react-modal";
import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import  CloseIcon from "assets/icons/actions/close.svg?react";
import Store from "../ModalStore";
import ModalStore from "../ModalStore";
import { useLoggedIn } from "context/LoggedInContext";

Modal.setAppElement("#root");

export const NotificationModal = forwardRef((props, ref) => {
  const { setIsAction } = useLoggedIn()
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [wasOpened, setWasOpened] = React.useState(false);
  const [state] = React.useState({});
  const [onCloseOpenPrevious, setOnCloseOpenPrevious] = React.useState(false);
  const [uid, setUid] = useState();
  const [childrenVisible, setChildrenVisible] = useState(true);
  const { title, children, className } = props;

  const forceUpdate = () => {
    setChildrenVisible(false);
    setChildrenVisible(true);
  };

  useImperativeHandle(
    ref,
    () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return {
        uid: getUid(),
        title: title,
        isOpen: isOpen(),
        state: state,
        open() {
          ModalStore.closeAll(uid);
          setIsOpen(true);
          setWasOpened(true);
          ModalStore.setPreviousOpened(this);
        },
        close(withoutEvents = false) {
          setIsOpen(false);
          if (!withoutEvents) {
            props.onClose && props.onClose();
          }
        },
        toggle() {
          setIsOpen(!modalIsOpen);
        },
        changeProps(newProps) {
          ref.props = { ...ref.props, ...newProps };
          forceUpdate();
        },
        onCancel(cb) {
          // setOnCancelHandler(() => cb);
        },
        onCloseOpenPrevious() {
          setOnCloseOpenPrevious(true);
        },
        rerender(c) {
          ModalStore.components
            .find((c) => c.ref.current.uid === this.uid)
            .remove();
          ModalStore.open(c());
        },
      };
    },
    [modalIsOpen, wasOpened]
  );

  function isOpen() {
    return modalIsOpen;
  }

  function getUid() {
    let out;

    if (!uid) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      out =
        "modal_" +
        Date.now().toString(36) +
        Math.random().toString(36).substr(2);
      setUid(out);

      return out;
    } else {
      return uid;
    }
  }

  function closeModal() {
    setIsOpen(false);
    setIsAction(null);
    props.onClose && props.onClose();
    if (onCloseOpenPrevious) {
      ModalStore.getPreviousOpened()?.open();
    }
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Modal"
      className={`notification-modal`}
      overlayClassName="notification-overlay"
    >
      <div className={`notification-content w-[500px]  ${className}`}>
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
        <div onClick={closeModal} className="notification-content__close-icon">
          <CloseIcon></CloseIcon>
        </div>
      </div>
    </Modal>
  );
});

export const ReactModals = () => {
  const [state, setState] = useState([...Store.components]);
  const elRefs = React.useRef([]);

  Store.setUpdateHandler((components) => {
    setState(components);
  });

  return (
    <>
      {state.map((item, index) => {
        const Modal = item.component;

        elRefs.current[index] = elRefs.current[index] || createRef();
        item.ref = elRefs.current[index];

        if (typeof Modal === "object" && !Modal?.render) {
          return (
            <Modal.type
              {...Modal.props}
              key={index}
              ref={elRefs.current[index]}
            />
          );
        }

        return <Modal key={index} ref={elRefs.current[index]}></Modal>;
      })}
    </>
  );
};

export default NotificationModal;
