import "../style.css";
import Modal from "components/Modal";
import { useModalContext } from "context/ModalContext";
import VerifyPhoneCodeForm from "../../Forms/VerifyPhoneCodeForm";
import { useLoggedIn } from "context/LoggedInContext";

export const VerifyPhoneCodeModal = () => {
  const { modalState, closeModal } = useModalContext();
  const {user} = useLoggedIn()
  return (
    <Modal
      isCloseIcon
      modalIsOpen={modalState?.isVerifyPhoneCodeModalOpen}
      closeModal={() => {
        closeModal("isVerifyPhoneCodeModalOpen");
      }}
      title={"Verification Code"}
      description={`Please enter code sent to ${user?.phone_number}`}
    >
      {{
        content: (
          <div>
            <VerifyPhoneCodeForm />
          </div>
        ),
      }}
    </Modal>
  );
};

export default VerifyPhoneCodeModal;
