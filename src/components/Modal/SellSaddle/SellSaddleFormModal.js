import SellSaddleForm from "components/Forms/SellSaddleForm";
import { useModalContext } from "context/ModalContext";
import Modal from "../";

export const SellSaddleFormModal = (props) => {
  const { modalState, closeModal } = useModalContext();

  return (
    <Modal
      className="!max-h-[100vh] !overflow-y-scroll"
      modalIsOpen={modalState?.isSellSaddleFormModalOpen}
      closeModal={() => closeModal("isSellSaddleFormModalOpen")}
    >
      {{
        content: <SellSaddleForm />,
      }}
    </Modal>
  );
};

export default SellSaddleFormModal;
