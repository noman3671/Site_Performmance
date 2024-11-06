import "./style.scss";
import { useEffect, useState } from "react";
import { FormInput } from "components/Inputs";
import Button from "components/Buttons";
import { useNavigate } from "react-router-dom-middleware";
import { FormProvider, useForm } from "react-hook-form";
import ConfirmSignUpForm from "../ConfirmSignUpForm";
import ModalStore from "components/Modal/ModalStore";
import TextArea from "components/Inputs/TextArea";
import { useSaddleContext } from "context/SaddleContext";
import { useModalContext } from "context/ModalContext";
import { SELL_SADDLE } from "apollo/mutations/sellsaddle";
import { gql, useMutation, useQuery } from "@apollo/client";
import { LIST_DISCIPLINES } from "apollo/queries/disciplines";
import { formatListArray, formatSaddleDiscipline } from "utils";

const SellSaddleForm = () => {
  const navigate = useNavigate();
  const {closeModal} = useModalContext();
  const { state, setters } = useSaddleContext();
  const [sellSaddleAdd, {}] = useMutation(gql(SELL_SADDLE));

  const { data: listDisciplinesData } = useQuery(gql(LIST_DISCIPLINES));
  const [otherBrandValue, setOtherBrandValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const [isError, setIsError] = useState("");
  const [showOtherComponent, setShowOtherComponent] = useState(false);

  const methods = useForm({
    defaultValues: {
      id: state.saddleData?.id,
      brandName: state.saddleData?.brandName || "",
      condition:
        state.saddleData?.status === "PERSONAL_PURCHASED"
          ? {
              value: state.saddleData?.condition,
              label: formatSaddleDiscipline(state.saddleData?.condition),
            }
          : state.saddleData?.condition?.value,
      price: state.saddleData?.price || "",
      description: state.saddleData?.description || "",
      size: state.saddleData?.size || "",
      discipline: {
        value: state.saddleData?.discipline,
        label: formatSaddleDiscipline(state.saddleData?.discipline),
      },
    },
  });
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

  const handleBrandChange = (value) => {
    const brandNameValue = typeof value === "object" ? value.label : value;
    if (brandNameValue === "OTHER") {
      setShowOtherComponent(true);
      setOtherBrandValue(state.saddleData.otherBrandName || "");
      methods.setValue("brandName", "", { shouldValidate: false });
      methods.setValue(
        "otherBrandName",
        state.saddleData.otherBrandName || "",
        {
          shouldValidate: true,
        }
      );
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

  const onHandleSellSaddle = async (data) => {
    try {
      setLoading(true);

      const input_sell_saddle_data = {
        id: data?.id,
        condition: data?.condition?.value,
        price: +data?.price,
        title: `${data?.size}" ${data?.brandName
          .split("_")
          .join(" ")}  ${data?.discipline?.value.split("_").join(" ")}`,
        description: data?.description,
        size: data?.size,
        brandName: data?.brandName,
        discipline: data?.discipline?.value,
      };

      await sellSaddleAdd({
        variables: { input: input_sell_saddle_data },
        refetchQueries: ["listUserSaddles", "listMySaddles"],
      });

      ModalStore.openSimpleSuccess({
        title: "SUCCESS!",
        subtitle: "Saddle is now for sale",
      });
      closeModal("isSellSaddleFormModalOpen")
      setters.setToggleButton(true);
      navigate("/user/my-saddle");
      methods.reset();
    } catch (error) {
      ModalStore.openSimpleError({
        title: "ERROR",
        subtitle: error.message?.toString() || "Undefined error",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderConfirmationForm = () => {
    return <ConfirmSignUpForm loading={loading} isError={isError} />;
  };

  const disciplinesOptions = formatListArray(
    listDisciplinesData?.listDisciplines
  );

  const westernOptions = disciplinesOptions.filter(option => option.label === 'WESTERN');


  const renderForm = () => {
    return (
      <div className="sell_saddle-modal-content flex justify-center">
        <div className="sell_saddle-content">
          <p className="sellSaddle-form  text-start w-[315px]">
            The new title of the saddle will be created by using its size, brand
            name and discipline. make sure to write properly.
          </p>
          <div className="sell_saddle-content-form mt-10">
            {showOtherComponent ? (
              <FormInput
                className="add_saddle_detail-form__field w-full"
                label="Brand"
                name="otherBrandName"
                value={otherBrandValue}
                onChange={handleOtherBrandChange}
                placeholder="Enter maker name"
                validations={{
                  required: {
                    value: true,
                    message: "Brand is required",
                  },
                }}
              />
            ) : (
              <FormInput
                className="add_saddle_detail-form__field w-full"
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
                  showOtherComponent
                    ? handleOtherBrandChange
                    : handleBrandChange
                }
              />
            )}
            <FormInput
              className="add_saddle_detail-form__field w-full"
              label="Saddle Condition"
              name="condition"
              type="select"
              height="52px"
              placeholder={"Select condition"}
              validations={{
                required: { value: true, message: "Condition is required" },
              }}
              options={conditionOptions && conditionOptions}
            />
            <div className="flex justify-between">
              <FormInput
                className="add_saddle_detail-form__field w-[155px]"
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
                className="add_saddle_detail-form__field w-[155px]"
                label="Price"
                name="price"
                type="float"
                maxLength={6}
                validations={{
                  required: { value: true, message: "Price is required" },

                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: "Enter a valid number upto two decimal",
                  },
                }}
                placeholder="Enter price"
              />
            </div>
            <FormInput
              className="add_edit_detail-form__field !w-full"
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
            <div className="relative">
              <TextArea
                placeholder="Enter any details you want your buyers to know"
                id="myTextArea"
                name="description"
                rows="4"
                cols="50"
                validations={{
                  required: { value: true, message: "Description is required" },
                }}
                className="h-[150px] rounded-[80px]  mx-auto  !w-[320px]"
              ></TextArea>
              <span className="absolute  text-area-description top-[-16px] left-0 text-center bg-white">
                Description{" "}
                <span className="text-[20px] relative top-1">*</span>
              </span>
            </div>
          </div>
          <div className="border_sell_saddle_dsh"></div>

          <div className="sell_saddle-content-submit">
            <Button
              loading={loading}
              type="submit"
              className={"sell_saddle_form_btn !w-full"}
              primary
              whiteOutline
            >
              Sell Saddle
            </Button>
            <Button
              className={`cancel_btn !w-full`}
              onClick={() => closeModal("isSellSaddleFormModalOpen") }
            >
              Cancel
            </Button>
            <p className="text-red-400 error-text">{isError && isError}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onHandleSellSaddle)}>
          {newUser === null || state.saddleData === null
            ? renderForm()
            : renderConfirmationForm()}
        </form>
      </FormProvider>
    </>
  );
};

export default SellSaddleForm;