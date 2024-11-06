import { useForm } from "react-hook-form";
import HorseForm from "../HorseForm";
import { getSelectedDisciplines } from "utils";
import ModalStore from "components/Modal/ModalStore";
import { useHorseContext } from "context/HorseContext";
import { useModalContext } from "context/ModalContext";
import { img_upload_base_path } from "constants/constants";
import React, { useEffect } from "react";

export const EditHorse = () => {
  const { closeModal } = useModalContext();
  const { state, setters, actions } = useHorseContext();
  const onClose = () => closeModal("isEditHorseModalOpen");

  const methods = useForm({
    defaultValues: {
      name: state.horseData?.name || "",
      dob: state.horseData?.dob || "",
      photo: state.horseData?.photo?.split("/public")[1]?.slice(1) || "",
      discipline: null,
    },
  });

  useEffect(() => {
    const fetchDisciplinesData = async () => {
      try {
        await actions.refetchListDisciplines();
      } catch (error) {}
    };
    fetchDisciplinesData();
  }, []);

  useEffect(() => {
    const selectedDisciplines = getSelectedDisciplines(
      state.listDisciplinesData?.listDisciplines,
      state.horseData?.discipline
    );
    if (selectedDisciplines) {
      methods.setValue("discipline", selectedDisciplines);
    }
  }, [state.listDisciplinesData]);

  const onSubmit = async (data) => {
    setters.setIsHorseUpdating(true);
    let disciplineArr = [];
    data?.discipline?.length > 0 &&
      data?.discipline?.forEach((element) => {
        disciplineArr.push(element?.value);
      });
    const photo = `${data?.photo ? img_upload_base_path : ""}${
      data?.photo ? data?.photo : ""
    }`;
    const input_horse_data = {
      name: data?.name,
      dob: data?.dob,
      photo: photo,
      discipline: disciplineArr,
    };
    try {
      await actions.updateHorse({
        variables: {
          input: { ...input_horse_data, id: state.horseData?.id },
        },
      });
      ModalStore.openSimpleSuccess({
        title: "SUCCESS!",
        subtitle: "This horse profile has been updated",
      });
      onClose();
    } catch (error) {
    } finally {
      setters.setIsHorseUpdating(false);
    }
  };

  return (
    <HorseForm
      onSubmit={onSubmit}
      methods={methods}
      onCancel={onClose}
      isLoading={state.isHorseUpdating}
      defaultImage={state.horseData.photo}
    />
  );
};
