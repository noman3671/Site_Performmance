import { useModalContext } from "context/ModalContext";
import RegisterForm from "components/Forms/RegisterForm";
import { useNavigate } from "react-router-dom";
import Modal from "..";

export const RegisterModal = () => {
  const navigate = useNavigate();
  const { modalState, closeModal, closePasswordVisibility } = useModalContext();

  return (
    <Modal
      title={"Welcome"}
      modalIsOpen={modalState?.isRegisterModalOpen}
      className="!max-h-[100vh] !overflow-y-scroll"
      closeModal={() => {
        if (window.history?.state?.idx === 0) {
          navigate("/");
        } else {
          navigate(-1);
        }
        closeModal("isRegisterModalOpen");
        closePasswordVisibility("registerPassword");
        closePasswordVisibility("repeatPassword");
      }}
    >
      {{
        content: <RegisterForm />,
      }}
    </Modal>
  );
};

export default RegisterModal;
