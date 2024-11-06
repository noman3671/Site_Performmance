import "./style.css";
import Modal from "../";
import Button from "components/Buttons";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "context/ModalContext";

const CongratsModal = () => {
  const navigate = useNavigate();
  const { horseName, modalState, closeModal } = useModalContext();

  return (
    <Modal
      isCloseIcon
      modalIsOpen={modalState.isCongratulationModalOpen}
      closeModal={() => closeModal("isCongratulationModalOpen")}
      className={`relative z-10 flex flex-col !p-10`}
    >
      {{
        content: (
          <div className="flex flex-col justify-center items-center gap-4 mt-2">
            <h3 className="congrats_title">Congratulations!</h3>
            <p className="congrats_description">
              {`We added "${horseName}" to your profile, to schedule an event please
              click below.`}
            </p>
            <Button
              onClick={() => {
                navigate("/event");
                closeModal("isCongratulationModalOpen");
              }}
              className={`btn-schedule`}
              primary
              whiteOutline
            >
              Schedule Scan
            </Button>
          </div>
        ),
      }}
    </Modal>
  );
};

export default CongratsModal;
