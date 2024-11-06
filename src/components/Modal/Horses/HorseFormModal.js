import Modal from "../";
import { useHorseContext } from "context/HorseContext";
import { useModalContext } from "context/ModalContext";
import AddHorse from "components/Forms/Horse/AddHorse";
import DeleteForm from "components/Forms/Horse/DeleteForm";
import { EditHorse } from "components/Forms/Horse/EditHorse";

export const HorseFormModal = () => {
  const { state, setters } = useHorseContext();
  const { modalState, closeModal } = useModalContext();
  const modalHeightClass = modalState.isDeleteHorseModalOpen
    ? "h-[300px]"
    : "h-[550px]";

  return (
    <Modal
      modalIsOpen={
        modalState.isAddHorseModalOpen ||
        modalState.isEditHorseModalOpen ||
        modalState.isDeleteHorseModalOpen
      }
      closeModal={() => {
        if (modalState.isDeleteHorseModalOpen) {
          closeModal("isDeleteHorseModalOpen");
          setters.setDeleteHorses([])
        } else if (modalState.isEditHorseModalOpen) {
          closeModal("isEditHorseModalOpen");
        } else {
          closeModal("isAddHorseModalOpen");
        }
      }}
      className={`w-[360px] sm:!w-auto flex flex-col items-center justify-center ${modalHeightClass}`}
      title={
        modalState.isEditHorseModalOpen
          ? "Edit Horse"
          : state.deleteHorses.length
          ? state.deleteHorses.length > 1 && state.selectAll
            ? "Delete All Horses"
            : "Delete horse"
          : "Add Horse"
      }
    >
      {{
        content: modalState?.isEditHorseModalOpen ? (
          <EditHorse />
        ) : modalState?.isDeleteHorseModalOpen ? (
          <DeleteForm />
        ) : (
          <AddHorse />
        ),
      }}
    </Modal>
  );
};

export default HorseFormModal;
