import Modal from "components/Modal";
import DeleteSaddle from "components/Forms/Saddle/DeleteSaddle";
import { useSaddleContext } from "context/SaddleContext";
import { useModalContext } from "context/ModalContext";
import "../style.css";

export const SellSaddleModal = () => {
  const { state } = useSaddleContext();
  const { modalState, closeModal } = useModalContext();

  return (
    <Modal
      modalIsOpen={modalState.isDeleteSaddleModalOpen}
      closeModal={() => closeModal("isDeleteSaddleModalOpen")}
      className="!w-[462px]"
      title={`${
        state.deleteSaddle.length > 1 && state.selectAll
          ? "Delete ALL Saddles"
          : "Delete Saddle"
      }`}
    >
      {{
        content: <DeleteSaddle />,
      }}
    </Modal>
  );
};

export default SellSaddleModal;
