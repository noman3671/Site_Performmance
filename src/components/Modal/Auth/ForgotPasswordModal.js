import "../style.css";
import Modal from "components/Modal";
import { useModalContext } from "context/ModalContext";
import ForgotPasswordForm from "components/Forms/ForgotPasswordForm";

export const ForgotPasswordModal = () => {
  const { modalState, closeModal, closePasswordVisibility } = useModalContext();

  return (
    <Modal
      modalIsOpen={modalState?.isForgotPasswordModalOpen}
      closeModal={() => {
        closeModal("isForgotPasswordModalOpen");
        closePasswordVisibility("newPassword");
        closePasswordVisibility("repeatNewPassword");
      }}
      title={"Forgot password?"}
    >
      {{
        content: <ForgotPasswordForm />,
      }}
    </Modal>
  );
};

export default ForgotPasswordModal;
