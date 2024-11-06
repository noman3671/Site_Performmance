import React, { useEffect, useState } from "react";
import { FormInput } from "components/Inputs";
import Button from "components/Buttons";
import { FormProvider, useForm } from "react-hook-form";
import { createToast } from "utils/Toast";
import vectorline from "assets/icons/Vectorline.svg";
import { CREATE_My_SADDLE } from "apollo/mutations/saddle";
import { gql, useMutation, useQuery } from "@apollo/client";
import { LIST_DISCIPLINES } from "apollo/queries/disciplines";
import { formatListArray } from "utils";
import { useNavigate } from "react-router-dom";
import ModalStore from "components/Modal/ModalStore";

const Toast = createToast();

const AddMySaddleForm = () => {
  const methods = useForm({
    defaultValues: {
      title: "",
      size: "",
      brandName: "",
      discipline: null,
    },
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [otherBrandValue, setOtherBrandValue] = useState("");

  const [addMySaddle] = useMutation(gql(CREATE_My_SADDLE));

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
        { value: "COLORADO", label: "COLORADO" },
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
      } catch (error) { }
    };
    refetchData();
  }, []);

  const onHandleCreateSaddle = async (data) => {
    try {
      setLoading(true);

      const input_my_saddle_data = {
        title: data?.title,
        size: data?.size,
        brandName: data?.brandName,
        discipline: data?.discipline?.value,
      };
      await addMySaddle({ variables: { input: input_my_saddle_data } });

      ModalStore.openSimpleSuccess({
        title: "SUCCESS!",
        subtitle: "Saddle Created Successfully",
      });

      navigate("/user/my-saddle");
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
      setOtherBrandValue("");
      methods.setValue("brandName", "", { shouldValidate: false });
      methods.setValue("otherBrandName", "", { shouldValidate: false });
    } else {
      setShowOtherComponent(false);
      methods.setValue("brandName", brandNameValue, { shouldValidate: true });
      methods.setValue("otherBrandName", "", { shouldValidate: false });
    }
  };

  const handleOtherBrandChange = (event) => {
    const { value } = event.target;
    setOtherBrandValue(value);

    methods.setValue("otherBrandName", value, { shouldValidate: true });

    if (value.trim() === "") {
      setShowOtherComponent(false);
      methods.setValue("brandName", "", { shouldValidate: true });
    }
  };

  // We are wanting to add a button that will allow user to sell the saddle and move this object to the used saddle market (coming soon) the button  "Sell Saddle" and create a pop up to notify user that the used saddle market is coming soon and to stay tuned for updates.

  const renderForm = () => {
    return (
      <>
        <div className="w-[90%] 2xl:w-[1338px] gap-[30px]  formheader mt-[48px] flex flex-wrap gap-y-[31px]  mx-auto">
          <FormInput
            className="my_saddle_detail-form__field w-full lg:w-[200px] 2xl:w-[250px]"
            label="Saddle Name"
            name="title"
            validations={{
              required: {
                value: true,
                message: "Saddle Listing Title is required",
              },
            }}
            placeholder="Enter Saddle Name"
          />
          {showOtherComponent ? (
            <FormInput
              className="add_saddle_detail-form__field !w-full sm:!w-full lg:!w-[200px] 2xl:!w-[250px]"
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
              className="add_saddle_detail-form__field !w-full sm:!w-full lg:!w-[200px] 2xl:!w-[250px]"
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
            className="my_saddle_detail-form__field w-full   lg:w-[140px] xl:w-[160px]  2xl:!w-[198px]"
            label="Seat Size"
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
            className="my_saddle_detail-form__field !w-full lg:!w-[160px] xl:!w-[160px]  2xl:!w-[230px]"
            label="Saddle Discipline"
            name="discipline"
            type="select"
            height="56px"
            placeholder={"Select discipline"}
            validations={{
              required: { value: true, message: "Discipline is required" },
            }}
            options={westernOptions && westernOptions}
          />
        </div>

        <div className="lg:h-[217px] rounded-[30px]  mx-auto !mt-[0px] lg:mt-[68px] w-[90%] 2xl:!w-[1340px]"></div>

        <div className="vectorline">
          <img src={vectorline} alt="vectorline" />
        </div>
        <div className="w-[90%] 2xl:w-[1338px] flex flex-wrap justify-between items-center mx-auto mt-[40px]">
          <Button
            className={`cancel_btn `}
            onClick={() => navigate("/user/my-saddle")}
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
        <form onSubmit={methods.handleSubmit(onHandleCreateSaddle)}>
          {renderForm()}
        </form>
      </FormProvider>
    </>
  );
};

export default AddMySaddleForm;
