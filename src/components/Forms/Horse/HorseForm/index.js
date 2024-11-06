import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import DatePicker from "components/DatePicker/DatePicker";
import { FormInput, UploadFormRow } from "components/Inputs";
import Button from "components/Buttons";
import { gql, useQuery } from "@apollo/client";
import { LIST_DISCIPLINES } from "apollo/queries/disciplines";
import { formatListArray } from "utils";

const HorseForm = ({
  onSubmit,
  onCancel,
  isLoading,
  methods,
  defaultImage,
}) => {
  const { data: listDisciplinesData, refetch: refetchListDisciplines } =
    useQuery(gql(LIST_DISCIPLINES));

  //   const horseRidingOptions = [
  //     {
  //         "label": "Western",
  //         "options": [
  //           { "value": "ranch", "label": "Ranch" },
  //           { "value": "trail_or_pleasure", "label": "Trail or Pleasure" },
  //           { "value": "roping", "label": "Roping" },
  //           { "value": "reining", "label": "Reining" },
  //           { "value": "cutting", "label": "Cutting" },
  //           { "value": "barrel", "label": "Barrel" },
  //           { "value": "endurance", "label": "Endurance" },
  //           { "value": "show", "label": "Show" }
  //         ]
  //       },
  // {
  //         "label": "English",
  //         "options": [
  //           { "value": "close_contact", "label": "Close Contact" },
  //           { "value": "dressage", "label": "Dressage" },
  //           { "value": "show_jumper", "label": "Show Jumper" },
  //           { "value": "hunter_jumper", "label": "Hunter Jumper" },
  //           { "value": "polo", "label": "Polo" },
  //           { "value": "eventing", "label": "Eventing" },
  //           { "value": "fox_hunting", "label": "Fox Hunting" },
  //           { "value": "equitation", "label": "Equitation" },
  //           { "value": "all_purpose", "label": "All Purpose" }
  //         ]
  //       },

  //   ];

  const disciplinesOptions = formatListArray(
    listDisciplinesData?.listDisciplines
  );

  const westernOptions = disciplinesOptions.filter(
    (option) => option.label === "WESTERN"
  );

  useEffect(() => {
    const fetchDisciplinesData = async () => {
      try {
        await refetchListDisciplines();
      } catch (error) {}
    };
    fetchDisciplinesData();
  }, []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center  gap-[38px]">
          <div className="flex justify-center gap-3 mt-[33px]">
            <div className="flex flex-col items-center w-auto gap-[30px]">
              <FormInput
                className="horse-profile-form__field w-[210px] sm:!w-[257px]"
                label="Horse Name:"
                name="name"
                validations={{
                  required: { value: true, message: "Horse name is required" },
                }}
                placeholder="Enter your horse's name"
              />
              <DatePicker
                name="dob"
                label={"Date of Birth"}
                placeholder={"Select horse’s DOB"}
                required
                className="horse-profile-date__field !w-[210px] sm:!w-[257px]"
                methods={methods}
              />
              <FormInput
                className="horse-profile-form__field !w-[210px] sm:!w-[257px]"
                label="Style of Riding:"
                isMulti={true}
                closeMenuOnSelect={false}
                name="discipline"
                height="56px"
                type="select"
                placeholder={"Select your riding style"}
                validations={{
                  required: {
                    value: true,
                    message: "riding style is required",
                  },
                }}
                options={westernOptions && westernOptions}
              />
            </div>
            <div>
              <UploadFormRow
                defaultImage={defaultImage && defaultImage}
                preview={true}
                previewSize={"113px"}
                name="photo"
                label={"Horse photo"}
                className={"create-account-form-fields__field"}
                compact
                immediateUpload
              ></UploadFormRow>
            </div>
          </div>
          <div className="flex !gap-x-5 sm:!gap-[30px] horse-form-actions">
            <Button
              loading={isLoading}
              type={"submit"}
              className={
                "horse-add-save-btn !w-[150px] !h-[56px] sm:!w-[182px]"
              }
              primary
              whiteOutline
            >
              save
            </Button>
            <Button
              type="button"
              onClick={onCancel}
              className={
                "horse-add-cancel-btn !w-[150px] !h-[56px] sm:!w-[182px]"
              }
              primaryOutline
            >
              cancel
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default HorseForm;
