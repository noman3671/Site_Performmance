import Modal from "components/Modal";
import { useModalContext } from "context/ModalContext";
import ShoppingCartContent from "components/Modal/ShoppingCart/ShoppingCartContent";

export const ShoppingCartModal = ({ isAdding, description }) => {
  const { modalState, closeModal } = useModalContext();

  return (
    <Modal
      modalIsOpen={modalState?.isShoppingCartModalOpen}
      closeModal={() => closeModal("isShoppingCartModalOpen")}
      className={`w-[340px] sm:!w-[497.768px] flex flex-col items-center justify-center h-[283px]`}
      title={isAdding ? "Added!" : "Already Added!"}
    >
      {{
        content: (
          <ShoppingCartContent
            description={
              description
                ? description
                : "The saddle is already added to your shopping cart."
            }
          />
        ),
      }}
    </Modal>
  );
};

export default ShoppingCartModal;