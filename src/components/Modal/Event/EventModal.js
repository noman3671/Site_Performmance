import Modal from "../";
import EventContent from "./EventContent";
import { useModalContext } from "context/ModalContext";
import { useToggleContext } from "context/ToggleContext";

export const EventModal = () => {
  const {setSelectedEvents} = useToggleContext();
  const { modalState, closeModal } = useModalContext();

  return (
    <Modal
      modalIsOpen={modalState.isEventModalOpen}
      closeModal={() => {
        closeModal("isEventModalOpen");
        setSelectedEvents([]);
      }}
      isCloseIcon={false}
      className={`!max-w-[460px] relative z-10 flex flex-col  !p-6`}
    >
      {{
        content: <EventContent />,
      }}
    </Modal>
  );
};

export default EventModal;
