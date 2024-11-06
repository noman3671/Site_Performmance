import { useState, useContext } from "react";
import { createContext } from "react";

export const ModalContext = createContext();
const ModalProvider = ({ children }) => {
  const [horseName, setHorseName] = useState("");
  const [editFullName, setEditFullName] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    registerPassword: false,
    newPassword: false,
    repeatPassword: false,
    repeatNewPassword: false,
  });

  const [modalState, setModalState] = useState({
    isSimpleModalOpen: false,
    // horses
    isCongratulationModalOpen: false,
    isAddHorseModalOpen: false,
    isEditHorseModalOpen: false,
    isDeleteHorseModalOpen: false,
    // saddles
    isDeleteSaddleModalOpen: false,
    isSellSaddleFormModalOpen: false,
    // cart
    isShoppingCartModalOpen: false,
    //upload image
    isUploadModalOpen: false,
    //Auth
    isRegisterModalOpen: false,
    isLoginModalOpen: false,
    isForgotPasswordModalOpen: false,
    //Event
    isEventModalOpen: false,
    //Coming Soon
    isComingSoonModalOpen: true,
    isVerifyPhoneCodeModalOpen: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const closePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const toggleModal = (modalName) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const closeModal = (modalName) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: false,
    }));
  };

  return (
    <ModalContext.Provider
      value={{
        modalState,
        horseName,
        setHorseName,
        toggleModal,
        closeModal,
        passwordVisibility,
        togglePasswordVisibility,
        closePasswordVisibility,
        editFullName,
        editPhone,
        editAddress,
        setEditFullName,
        setEditPhone,
        setEditAddress,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export { ModalProvider, useModalContext };
