import { FormProvider, useForm } from "react-hook-form";
import { useSaddleContext } from "context/SaddleContext";
import { useModalContext } from "context/ModalContext";
import ModalStore from "components/Modal/ModalStore";
import Button from "components/Buttons";

const DeleteSaddle = () => {
  const { closeModal } = useModalContext();
  const { state, setters, actions } = useSaddleContext();

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
      await actions.deleteSaddles({
        variables: { ids: state.deleteSaddle },
      });

      ModalStore.openSimpleDelete({
        title: "Deleted!",
        subtitle:
          state.deleteSaddle?.length > 1
            ? "All Saddle listing have been erased"
            : "This Saddle listing has been erased",
      });
      closeModal("isDeleteSaddleModalOpen");
    } catch (error) {
      ModalStore.openSimpleDelete({
        title: "Error!",
        subtitle:
          error.message || "Failed to Saddle listing. Please try again.",
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
            {state.deleteSaddle.length > 1
              ? "Are you sure you want to delete all listings? "
              : "Are you sure you want to delete this listing?"}
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
            onClick={() => closeModal("isDeleteSaddleModalOpen")}
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
};

export default DeleteSaddle;
