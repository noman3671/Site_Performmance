import "../style.css";
import { useModalContext } from "context/ModalContext";
import LoginForm from "components/Forms/LoginForm";
import Modal from "components/Modal";

export const LoginModal = () => {
  const { modalState, closeModal, closePasswordVisibility } = useModalContext();
  const onClose = () => closeModal("isLoginModalOpen");

  return (
    <Modal
      modalIsOpen={modalState?.isLoginModalOpen}
      closeModal={() => {
        onClose();
        closePasswordVisibility("password");
      }}
      title={"Welcome back"}
    >
      {{
        content: <LoginForm closeLoginModal={onClose} />,
      }}
    </Modal>
  );
};

export default LoginModal;
