import Modal from "../";
import { useModalContext } from "context/ModalContext";
import GOBACK from "../../../assets/icons/go-back.svg?react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import stars from "../../../assets/icons/stars.svg";

export const ComingSoonModal = () => {
  const { closeModal } = useModalContext();
  const navigate = useNavigate();

  return (
    <Modal
      modalIsOpen={true}
      closeModal={() => {
        closeModal("isComingSoonModalOpen");
      }}
      className={`w-[777px] !h-auto main-modal-container`}
    >
      {{
        content: (
          <div className="w-full">
            <div className="coming-soon-container">
              <img src={stars} alt="stars" />

              <h3 className="coming-soon">Coming Soon!</h3>
              <p className="coming_soon_description sm:w-[665px] ">
              We are adding saddles from top brands. Check back soon for updates!
              </p>
              <button
                onClick={() => navigate(-1)}
                className="go-back gap-x-[8px] bg-white cursor-pointer flex"
              >
                <GOBACK /> go back
              </button>
            </div>
          </div>
        ),
      }}
    </Modal>
  );
};

export default ComingSoonModal;
