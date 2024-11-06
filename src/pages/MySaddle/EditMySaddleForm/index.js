import dayjs from "dayjs";
import { uploadData } from "aws-amplify/storage";
import React, { useEffect, useRef, useState } from "react";
import { FormInput } from "components/Inputs";
import Button from "components/Buttons";
import { CameraIcon } from "components/Icons";
import { FormProvider, useForm } from "react-hook-form";
import { createToast } from "utils/Toast";
import VectorLineIcon from "assets/icons/Vectorline.svg?react";
import { UPDATE_MY_SADDLE } from "apollo/mutations/saddle";
import { gql, useMutation, useQuery } from "@apollo/client";
import { LIST_DISCIPLINES } from "apollo/queries/disciplines";
import { formatListArray, formatSaddleDiscipline } from "utils";
import { useSaddleContext } from "context/SaddleContext";
import { img_upload_base_path } from "constants/constants";
import {
  LIST_MY_SADDLES,
  LIST_USER_SELL_SADDLES,
} from "apollo/queries/saddles";
import { useLocation, useNavigate } from "react-router-dom";
import ModalStore from "components/Modal/ModalStore";
import TextArea from "components/Inputs/TextArea";
import "./style.css";

const Toast = createToast();

const EditMySaddleForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showOtherComponent, setShowOtherComponent] = useState(false);
  const [otherBrandValue, setOtherBrandValue] = useState("");
  const [photo, setPhoto] = useState("");
  const [s3UploadedPath, setS3UploadedPath] = useState(null);

  const fileInputRef = useRef(null);

  const methods = useForm({
    defaultValues: {
      id: location?.state.item?.id || "",
      title: location?.state.item?.title || "",
      brandName: location?.state.item?.brandName || "",
      size: location?.state.item?.size || "",
      price: location?.state.item?.price || 0,
      photo: location?.state.item?.photo || null,
      condition: {
        value: location?.state.item?.condition,
        label: formatSaddleDiscipline(location?.state.item?.condition),
      },
      description: location?.state.item?.description || "",
      discipline: {
        value: location?.state.item?.discipline,
        label: formatSaddleDiscipline(location?.state.item?.discipline),
      },
    },
  });

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(false);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadProgress(true);
      const file = e.target.files[0];
      const image = URL.createObjectURL(file);
      methods.setValue("photo");
      setPhoto(image);

      try {
        const result = await uploadData({
          key: `saddle/${dayjs().unix()}-${file.name}`,
          data: file,
          options: {
            accessLevel: "guest",
          },
        }).result;
        setS3UploadedPath(result?.key);
      } catch (error) {
        console.log({ error });
      } finally {
        setUploadProgress(false);
      }
    }
  };

  const [updateMySaddle, {}] = useMutation(gql(UPDATE_MY_SADDLE), {
    update: (cache, { data }) => {
      const listUserSellSaddleData = cache.readQuery({
        query: gql(LIST_USER_SELL_SADDLES),
        variables: {
          limit: 5,
          nextToken: null,
        },
      });

      if (listUserSellSaddleData) {
        const updatedListUserSaddle =
          listUserSellSaddleData?.listUserSellSaddles?.items.map((saddle) =>
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
        const updatedListUserSaddle =
          listUserMySaddleData?.listUserSaddle?.items.map((saddle) =>
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

  const { data: listDisciplinesData, refetch: refetchListDisciplines } =
    useQuery(gql(LIST_DISCIPLINES));

  const handleBrandChange = (value) => {
    const brandNameValue = typeof value === "object" ? value.label : value;
    if (brandNameValue === "OTHER") {
      setShowOtherComponent(true);
      setOtherBrandValue(location?.state.item.otherBrandName || "");
      methods.setValue("brandName", "", { shouldValidate: false });
      methods.setValue(
        "otherBrandName",
        location?.state.item.otherBrandName || "",
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
    setOtherBrandValue(location?.state.item.otherBrandName);
    methods.setValue("otherBrandName", location?.state.item.otherBrandName);
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

  const onHandleEditSaddle = async (data) => {
    try {
      setLoading(true);
      const photo = `${s3UploadedPath ? img_upload_base_path : ""}${
        s3UploadedPath ? s3UploadedPath : ""
      }`;
      const UpdateSaddleInput = {
        ...(location?.state.item?.status === "SELL_LIVE"
          ? {
              id: data?.id,
              title: `${data?.size}" ${data?.brandName
                .split("_")
                .join(" ")}  ${data?.discipline?.value.split("_").join(" ")}`,
              size: data?.size,
              price: data?.price,
              photo: photo || location?.state.item?.photo,
              description: data?.description,
              discipline: data?.discipline?.value,
              brandName: data?.brandName,
              condition: data?.condition?.value,
            }
          : {
              id: data?.id,
              title: data?.title,
              brandName: data?.brandName,
              photo: photo || location?.state.item?.photo,
              size: data?.size,
              price: data?.price,
              description: data?.description,
              discipline: data?.discipline?.value,
              condition: data?.condition?.value,
            }),
      };

      await updateMySaddle({ variables: { input: UpdateSaddleInput } });

      ModalStore.openSimpleSuccess({
        title: "SUCCESS!",
        subtitle: "Saddle updated Successfully",
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


  const renderForm = () => {
    return (
      <>
        <div className="relative w-[90%] mx-auto">
          <img
            src={photo ? photo : location?.state.item?.photo}
            alt="saddle_img"
            className="profile-pic w-[85px] h-[85px] rounded-full"
          />
          <div
            onClick={() => fileInputRef?.current.click()}
            className="camera-icon z-0 flex items-center justify-center cursor-pointer absolute w-[42px] h-[42px] rounded-full bg-[#5C80B6] hover:bg-gray-500 hover:bg-opacity-95 hover:animate-pulse mb-[-10px] bottom-0 left-12"
          >
            <CameraIcon className="!text-transparent" />
          </div>
          <input
            type="file"
            name="photo"
            ref={fileInputRef}
            onChange={onFileChange}
            className="hidden"
          />
        </div>
        <div className="w-[90%] 2xl:w-[1338px]  formheader mt-[48px] flex flex-wrap gap-y-[31px] gap-x-[30px] mx-auto">
          {location?.state.item?.status !== "SELL_LIVE" && (
            <FormInput
              className="add_edit_detail-form__field w-full lg:w-[165px] 2xl:w-[250px]"
              label="Saddle Name"
              name="title"
              validations={{
                required: {
                  value: true,
                  message: "Saddle Listing Title is required",
                },
              }}
              placeholder="Enter saddle listing title"
            />
          )}

          {showOtherComponent ? (
            <FormInput
              className="add_saddle_detail-form__field w-full lg:w-[165px] 2xl:w-[250px]"
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
              className="add_saddle_detail-form__field w-full lg:w-[165px] 2xl:w-[250px]"
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
            className="add_edit_detail-form__field !w-full lg:!w-[180px] xl:!w-[180px]"
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
          {location?.state.item?.status.split("_")[1] === "LIVE" && (
            <>
              <FormInput
                className="add_saddle_detail-form__field !w-full  lg:!w-[160px] xl:!w-[190px]"
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

              <FormInput
                className="add_saddle_detail-form__field w-full  lg:w-[140px] xl:w-[160px]"
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

              <div className="relative w-[100%] 2xl:!w-[1340px]">
                <TextArea
                  placeholder="Enter any details you want your buyers to know"
                  id="myTextArea"
                  name="description"
                  rows="4"
                  cols="50"
                  validations={{
                    required: {
                      value: true,
                      message: "Description is required",
                    },
                  }}
                  className="h-[217px] rounded-[30px]  mx-auto !mt-[31px] lg:mt-[68px] "
                ></TextArea>
                <div className=" absolute flex items-center top-4 left-0 ml-2 px-3 bg-white">
                  <label className="description-label ">Description </label>
                  <div className="text-[18px] ml-1 flex items-center">*</div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="mt-10 lg:min-h-[100px]"></div>

        <div className="vectorline">
          <VectorLineIcon />
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
            disabled={!!uploadProgress}
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

export default EditMySaddleForm;
