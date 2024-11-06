import "./style.css";
import { FormProvider, useForm } from "react-hook-form";
import { useHorseContext } from "context/HorseContext";
import { useModalContext } from "context/ModalContext";
import ModalStore from "components/Modal/ModalStore";
import Button from "components/Buttons";
import { getItemFromStorage, removeItemFromStorage } from "utils/localStorage";

const DeleteForm = () => {
  const { closeModal } = useModalContext();
  const { state, setters, actions } = useHorseContext();
  const onClose = () => closeModal("isDeleteHorseModalOpen");

  const methods = useForm({
    defaultValues: {
      name: "",
      dob: "",
      color: "",
      photo: null,
    },
  });

  const onSubmit = async (data) => {
    setters.setIsDeleting(true);
    try {
      await actions.deleteHorse({
        variables: { ids: state.deleteHorses },
        refetchQueries: ["listUserHorses"],
      });

      const horseFromLocalStorage = getItemFromStorage("selectedHorse");
      if (state.deleteHorses?.includes(horseFromLocalStorage?.value)) {
        removeItemFromStorage("selectedHorse");
      }
      ModalStore.openSimpleDelete({
        title: "Deleted!",
        subtitle:
          state.deleteHorses.length > 1
            ? "The selected horse profiles has been erased"
            : "This horse profile has been erased",
      });

      setters.setDeleteHorses([]);
      setters.setIsDeletedSuccessfully((prevValue) => !prevValue);
      onClose();
    } catch (error) {
      ModalStore.openSimpleDelete({
        title: "Error!",
        subtitle: error.message || "Failed to delete horse. Please try again.",
      });
    } finally {
      setters.setIsDeleting(false);
    }
  };

  const renderForm = () => {
    return (
      <div className=" flex flex-col items-center gap-[38px]">
        <div className=" flex justify-center gap-3 mt-[33px]">
          <p className="delete-form__text">
            {state.deleteHorses.length > 1
              ? "Are you sure you want to delete the selected profiles?"
              : "Are you sure you want to delete this profile?"}
          </p>
        </div>
        <div className="flex gap-[40px] horse-form-actions">
          <Button
            type={"submit"}
            className={"horse-add-save-btn"}
            primary
            whiteOutline
            loading={state.isDeleting}
          >
            Delete
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className={"horse-add-cancel-btn"}
            primaryOutline
          >
            cancel
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>{renderForm()}</form>
      </FormProvider>
    </>
  );
}

export default DeleteForm;