import React, { useEffect, useState } from "react";
import { FormInput } from "components/Inputs";
import Button from "components/Buttons";
import { FormProvider, useForm } from "react-hook-form";
import { createToast } from "utils/Toast";
import VectorLineIcon from "assets/icons/Vectorline.svg?react";
import { UPDATE_SADDLE } from "apollo/mutations/saddle";
import { gql, useMutation, useQuery } from "@apollo/client";
import TextArea from "components/Inputs/TextArea";
import { LIST_DISCIPLINES } from "apollo/queries/disciplines";
import { formatListArray, formatSaddleDiscipline } from "utils";
import { useSaddleContext } from "context/SaddleContext";
import {
  LIST_MY_SADDLES,
  LIST_USER_SELL_SADDLES,
} from "apollo/queries/saddles";
import { useNavigate } from "react-router-dom";
import ModalStore from "components/Modal/ModalStore";

const Toast = createToast();

const EditSellSaddleForm = () => {
  const { state } = useSaddleContext();
  const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [otherBrandValue, setOtherBrandValue] = useState("");
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      id: state.saddleData?.id || "",
      title: state.saddleData?.title || "",
      brandName: state.saddleData?.brandName || "",
      size: state.saddleData?.size || "",
      condition: {
        value: state.saddleData?.condition,
        label: formatSaddleDiscipline(state.saddleData?.condition),
      },
      discipline: {
        value: state.saddleData?.discipline,
        label: formatSaddleDiscipline(state.saddleData?.discipline),
      },
      price: state.saddleData?.price || 0,
      description: state.saddleData?.description || "",
    },
  });

  const [loading, setLoading] = useState(false);

  const [updateSellSaddle, {}] = useMutation(gql(UPDATE_SADDLE), {
    update: (cache, { data }) => {
      const listUserSellSaddleData = cache.readQuery({
        query: gql(LIST_USER_SELL_SADDLES),
        variables: {
          limit: 5,
          nextToken: null,
        },
      });

      if (listUserSellSaddleData) {
        const updatedListUserSaddle = listUserSellSaddleData?.listUserSellSaddles?.items.map(
          (saddle) =>
            saddle?.id === data?.updateSaddle?.id ? data?.updateSaddle : saddle
        );
        cache.writeQuery({
          query: gql(LIST_USER_SELL_SADDLES),
          variables: {
            limit: 5,
            nextToken: null,
          },
          data: {
            listUserSaddles: {
              ...listUserSellSaddleData?.listUserSellSaddles,
              items: updatedListUserSaddle,
            },
          },
        });
      }

      const listUserMySaddleData = cache.readQuery({
        query: gql(LIST_MY_SADDLES),
        variables: {
          limit: 5,
          nextToken: null,
        },
      });

      if (listUserMySaddleData) {
        const updatedListUserSaddle = listUserMySaddleData?.listUserSaddle?.items.map(
          (saddle) =>
            saddle?.id === data?.updateSaddle?.id ? data?.updateSaddle : saddle
        );
        cache.writeQuery({
          query: gql(LIST_MY_SADDLES),
          variables: {
            limit: 5,
            nextToken: null,
          },
          data: {
            listUserSaddles: {
              ...listUserMySaddleData?.listUserSaddle,
              items: updatedListUserSaddle,
            },
          },
        });
      }
    },
  });

  const {
    data: listDisciplinesData,
    refetch: refetchListDisciplines,
  } = useQuery(gql(LIST_DISCIPLINES));

  const conditionOptions = [
    {
      options: [
        { value: "EXCELLENT", label: "EXCELLENT" },
        { value: "GOOD", label: "GOOD" },
        { value: "FAIR", label: "FAIR" },
        { value: "POOR", label: "POOR" },
      ],
    },
  ];

  const materialOptions = [
    {
      options: [
        { value: "PADDED", label: "PADDED" },
        { value: "GEL", label: "GEL" },
        { value: "LEATHER", label: "LEATHER" },
        { value: "OTHER", label: "OTHER" },
      ],
    },
  ];

  const typeOptions = [
    {
      options: [
        { value: "AMERICAN_SADDLERY", label: "AMERICAN SADDLERY" },
        { value: "BILLY_COOK", label: "BILLY COOK" },
        { value: "CACTUS_SADDLERY", label: "CACTUS SADDLERY" },
        { value: "CIRCLE_Y", label: "CIRCLE Y" },
        { value: "CONTINENTAL", label: "CONTINENTAL" },
        { value: "CRATES", label: "CRATES" },
        { value: "ENGLISH", label: "ENGLISH" },
        { value: "MARTIN", label: "MARTIN" },
        { value: "SIMCO", label: "SIMCO" },
        { value: "TEX_TAN", label: "TEX TAN" },
        { value: "TUCKER_TRAIL_SADDLES", label: "TUCKER TRAIL SADDLES" },
        { value: "OTHER", label: "OTHER" },
      ],
    },
  ];

  useEffect(() => {
    const refetchData = async () => {
      try {
        await refetchListDisciplines();
      } catch (error) {}
    };
    refetchData();
  }, []);

  const onHandleEditSaddle = async (data) => {
    try {
      setLoading(true);

      const UpdateSaddleInput = {
        id: data?.id,
        title: data?.title,
        brandName: data?.brandName,
        condition: data?.condition?.value,
        discipline: data?.discipline?.value,
        price: data?.price,
        size: data?.size,
        description: data?.description,
      };

      await updateSellSaddle({ variables: { input: UpdateSaddleInput } });

      ModalStore.openSimpleSuccess({
        title: "SUCCESS!",
        subtitle: "Saddle updated Successfully",
      });
      navigate("/user/sell-saddle");
      methods.reset();
    } catch (error) {
      Toast.fire({
        icon: "error",
        title: error.message?.toString() || "Undefined error",
      });
    } finally {
      setLoading(false);
    }
  };

  const disciplinesOptions = formatListArray(
    listDisciplinesData?.listDisciplines
  );

  const westernOptions = disciplinesOptions.filter(option => option.label === 'WESTERN');


  const handleBrandChange = (value) => {
    const brandNameValue = typeof value === "object" ? value.label : value;
    if (brandNameValue === "OTHER") {
      setShowOtherComponent(true);
      setOtherBrandValue(state.saddleData.otherBrandName || "");
      methods.setValue("brandName", "", { shouldValidate: false });
      methods.setValue("otherBrandName", state.saddleData.otherBrandName || "", {
        shouldValidate: true,
      });
    } else {
      setShowOtherComponent(false);
      setOtherBrandValue("");
      methods.setValue("brandName", brandNameValue, { shouldValidate: true });
      methods.setValue("otherBrandName", "", { shouldValidate: false });
    }
  };

  useEffect(() => {
    setShowOtherComponent(true);
    setOtherBrandValue(state.saddleData.otherBrandName);
    methods.setValue("otherBrandName", state.saddleData.otherBrandName);
  }, []);

  const handleOtherBrandChange = (event) => {
    const { value } = event.target;
    setOtherBrandValue(value);

    methods.setValue("otherBrandName", value, { shouldValidate: true });

    if (value.trim() === "") {
      setShowOtherComponent(false);
      methods.setValue("brandName", "", { shouldValidate: true });
    }
  };

  const renderForm = () => {
    return (
      <>
        <div className="w-[90%] 2xl:w-[1338px]  formheader mt-[48px] flex flex-wrap gap-y-[31px] justify-between mx-auto">
          <FormInput
            className="add_edit_detail-form__field w-full lg:w-[200px] 2xl:w-[250px]"
            label="Saddle Listing Title"
            name="title"
            validations={{
              required: {
                value: true,
                message: "Saddle Listing Title is required",
              },
            }}
            placeholder="Enter saddle listing title"
          />

          {showOtherComponent ? (
            <FormInput
              className="add_saddle_detail-form__field w-full lg:w-[200px] 2xl:w-[250px]"
              label="Brand"
              name="otherBrandName"
              value={otherBrandValue}
              onChange={handleOtherBrandChange}
              placeholder="Select Maker Name"
              validations={{
                required: {
                  value: true,
                  message: "Brand is required",
                },
              }}
            />
          ) : (
            <FormInput
              className="add_saddle_detail-form__field w-full lg:w-[200px] 2xl:w-[250px]"
              label="Brand"
              name="brandName"
              type="select2"
              height="53px"
              options={!showOtherComponent ? typeOptions : undefined}
              validations={{
                required: { value: true, message: "Brand is required" },
              }}
              placeholder={"Enter maker name"}
              value={showOtherComponent ? otherBrandValue : undefined}
              onChange={
                showOtherComponent ? handleOtherBrandChange : handleBrandChange
              }
            />
          )}
          <FormInput
            className="add_saddle_detail-form__field w-full  lg:w-[140px] xl:w-[160px]  2xl:!w-[198px]"
            label=" Seat Size"
            name="size"
            validations={{
              required: { value: true, message: "Size is required" },
              pattern: {
                value: /^[0-9]+(\.[0-9]+)?$/,
                message: "Please enter a valid number",
              },
            }}
            placeholder="Enter Size"
          />
          <FormInput
            className="add_saddle_detail-form__field  !w-full  lg:!w-[140px] xl:!w-[160px]"
            label="Saddle Condition"
            name="condition"
            type="select"
            height="52px"
            closeMenuOnSelect={true}
            placeholder={"Select condition"}
            validations={{
              required: { value: true, message: "Condition is required" },
            }}
            options={conditionOptions && conditionOptions}
          />
          <FormInput
            className="add_saddle_detail-form__field !w-full lg:!w-[140px] xl:!w-[160px]"
            label="Saddle Discipline"
            name="discipline"
            type="select"
            height="52px"
            placeholder={"Select discipline"}
            validations={{
              required: { value: true, message: "Discipline is required" },
            }}
            options={westernOptions && westernOptions}

          />

          <FormInput
            className="add_edit_detail-form__field w-full  lg:w-[140px] xl:w-[160px]"
            label="Price"
            name="price"
            validations={{
              required: { value: true, message: "Price is required" },
              pattern: {
                value: /^[0-9]+(\.[0-9]+)?$/,
                message: "Please enter a valid number",
              },
            }}
            placeholder="Enter price"
          />
        </div>

        <TextArea
          placeholder="Enter any details you want your buyers to know"
          id="myTextArea"
          name="description"
          rows="4"
          cols="50"
          validations={{
            required: { value: true, message: "Description is required" },
          }}
          className="h-[217px] rounded-[30px]  mx-auto !mt-[31px] lg:mt-[68px] w-[90%] 2xl:!w-[1340px]"
        ></TextArea>

        <div className="vectorline">
          <VectorLineIcon />
        </div>
        <div className="w-[90%] 2xl:w-[1338px] flex flex-wrap justify-between items-center mx-auto mt-[40px]">
          <Button
            className={`cancel_btn `}
            onClick={() => navigate("/user/sell-saddle")}
          >
            Cancel
          </Button>
          <Button
            whiteOutline
            className="save_exit_btn"
            primary
            loading={loading}
            type="submit"
          >
            Save & Exit
          </Button>
        </div>
      </>
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onHandleEditSaddle)}>
          {renderForm()}
        </form>
      </FormProvider>
    </>
  );
};

export default EditSellSaddleForm;