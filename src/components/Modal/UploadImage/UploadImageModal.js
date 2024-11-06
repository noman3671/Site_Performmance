import React from "react";
import Modal from "components/Modal";
import { useModalContext } from "context/ModalContext";
import { UploadImage } from "components/Forms/UploadImage/UploadImage";

const UploadModal = (props) => {
  const { modalState, closeModal } = useModalContext();

  return (
    <Modal
      modalIsOpen={modalState?.isUploadModalOpen}
      closeModal={() => closeModal("isUploadModalOpen")}
      className={props?.image ? "!text-[20px] !capitalize !w-[662px]" : ``}
      title={props?.image ? "Edit Thumbnail" : "choose a new image"}
    >
      {{
        content: <UploadImage />,
      }}
    </Modal>
  );
};

export default UploadModal;
