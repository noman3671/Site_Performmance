import { useState } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CREATE_HORSE } from "apollo/mutations/horses";
import { listUserHorses } from "apollo/queries/horses";
import ModalStore from "components/Modal/ModalStore";
import { img_upload_base_path } from "constants/constants";
import HorseForm from "../HorseForm";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "context/ModalContext";
import "./style.css";

const AddHorse = () => {
  const { closeModal, toggleModal, setHorseName } = useModalContext();
  const [isLoading, setIsLoading] = useState(false);
  const [addHorse] = useMutation(gql(CREATE_HORSE), {
    refetchQueries: [
      {
        query: gql(listUserHorses),
        variables: {
          limit: 5,
          nextToken: null,
        },
      },
    ],
  });

  const { data } = useQuery(gql(listUserHorses), {
    variables: {
      limit: 5,
      nextToken: null,
    },
  });
  const userHorsesCount = data?.listUserHorses?.items?.length;

  const methods = useForm({
    defaultValues: {
      name: "",
      dob: "",
      color: "",
      photo: null,
      discipline: null,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setHorseName(data?.name);
    let disciplineArr = [];

    if (data?.discipline?.length > 0) {
      data?.discipline?.forEach((element) => {
        disciplineArr.push(element.value);
      });
    }

    const photo = `${data?.photo ? img_upload_base_path : ""}${
      data?.photo ? data.photo : ""
    }`;

    const input_horse_data = {
      name: data?.name,
      dob: data?.dob,
      color: data?.color || "",
      photo: photo || "",
      discipline: disciplineArr,
    };

    try {
      if (input_horse_data) {
        await addHorse({ variables: { input: { ...input_horse_data } } });
        toggleModal("isCongratulationModalOpen");

        // if (userHorsesCount === 0) {
        // } 
        // else {
        //   ModalStore.openSimpleSuccess({
        //     title: "SUCCESS!",
        //     subtitle: "The horse profile has been added.",
        //   });
        // }
      }
    } catch (error) {
      ModalStore.openSimpleError({
        title: "Fail adding horse",
        subtitle: error.errors?.[0]?.message?.toString() || "Undefined error",
        onCancel: ref.current.open,
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const onClose = () => closeModal("isAddHorseModalOpen");

  return (
    <HorseForm
      onSubmit={onSubmit}
      isLoading={isLoading}
      methods={methods}
      onCancel={onClose}
    />
  );
};

export default AddHorse;
