import "./style.css";
import dayjs from "dayjs";
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { useUploadContext } from "context/ClientUploadContext";
import { ClientUploadIcon } from "components/Icons";
import Button from "components/Buttons";
import { getCroppedImg } from "./canvaUtils";
import { uploadData } from "aws-amplify/storage";
import { FormProvider, useForm } from "react-hook-form";
import { GET_USER_DATA } from "apollo/queries/ClientProfile";
import { gql, useMutation, useQuery } from "@apollo/client";
import { UPDATE_USER } from "apollo/mutations/Client";
import useS3Image from "hooks/useS3Image";
import { img_upload_base_path } from "constants/constants";
import { useModalContext } from "context/ModalContext";
import { useLoggedIn } from "../../../context/LoggedInContext";
import { createToast } from "utils/Toast";

const Toast = createToast();

export const UploadImage = () => {
  const methods = useForm({
    defaultValues: {
      photo: null,
    },
  });

  const {
    image,
    imageName,
    setImage,
    imageResult,
    setImageCropFinished,
    setImageResult,
    setImageName,
  } = useUploadContext();
  const { user } = useLoggedIn();
  const { closeModal } = useModalContext();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [updateUser] = useMutation(gql(UPDATE_USER));
  const { data: clientData } = useQuery(gql(GET_USER_DATA), {
    skip: !user,
    fetchPolicy: "network-only",
  });
  useS3Image(imageResult?.key);
  const zoomRange = 3 - 1; // Max zoom - min zoom
  const zoomPercentage = ((zoom - 1) / zoomRange) * 100;

  const onClose = () => {
    closeModal("isUploadModalOpen");
    setImage("");
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const image = URL.createObjectURL(file);
      setImageName(file.name);
      setImage(image);
    }
  };

  const handleUploadImage = async () => {
    setLoading(true);
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      const result = await uploadData({
        key: `profile/${dayjs().unix()}-${imageName}`,
        data: croppedImage,
        options: {
          accessLevel: "guest",
        },
      }).result;

      const photo = `${result?.key ? img_upload_base_path : ""}${
        result?.key ? result?.key : ""
      }`;
      setImageResult(photo);
      setImageCropFinished(true);
      const input_user_data = {
        phone: clientData?.user?.phone,
        address: clientData?.user?.address,
        zipCode: clientData?.user?.zipCode,
        streetName: clientData?.user?.streetName,
        city: clientData?.user?.city,
        state: clientData?.user?.state,
        country: clientData?.user?.country,
        firstName: clientData?.user?.firstName,
        lastName: clientData?.user?.lastName,
        photo: photo,
        saddlePreference: {
          brandName: "",
          condition: "EXCELLENT",
          minFitScore: 1.5,
          newOrUsed: "NEW",
          size: 1.5,
          style: "",
        },
      };

      if (photo) {
        await updateUser({
          variables: { input: input_user_data },
          refetchQueries: ["ClientQuery"],
        });
      }
      onClose();
    } catch (error) {
      console.error(error);
      Toast.fire({
        icon: "error",
        title: error.message?.toString() || "Undefined error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 1));
  };

  return (
    <>
      {image ? (
        <div className="flex flex-col p-4">
          <div className="w-96 h-96 mt-[20px] mx-auto overflow-hidden relative">
            <Cropper
              image={image}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              aspect={1}
              cropShape="round"
              showGrid={false}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>

          <div className="flex justify-start mr-auto mt-10 w-full items-center gap-2">
            <button
              onClick={handleZoomOut}
              className="text-xl bg-transparent leading-none px-2 py-1 select-none"
            >
              –
            </button>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full h-3 rounded-lg cursor-pointer appearance-none"
              style={{
                background: `linear-gradient(to right, #5C80B6 ${zoomPercentage}%, #EBEBEF ${zoomPercentage}%)`,
              }}
            />
            <button
              onClick={handleZoomIn}
              className="text-xl bg-transparent leading-none px-2 py-1 select-none"
            >
              +
            </button>
          </div>

          <div className="zoom_text text-sm text-gray-600 mt-2">
            Your profile picture is public on this site.
          </div>

          <div className="flex gap-6 mx-auto mt-12">
            <Button
              transparent
              onClick={onClose}
              disabled={loading}
              className="edit-cancel-btn px-4 py-2 rounded-full"
            >
              Cancel
            </Button>
            <Button
              primary
              whiteOutline
              className="edit-save-btn px-6 py-3 text-white rounded-full flex items-center justify-center"
              disabled={loading}
              loading={loading}
              onClick={handleUploadImage}
            >
              Save
            </Button>
          </div>
        </div>
      ) : (
        <FormProvider {...methods}>
          <div className="flex items-start justify-center">
            <label
              htmlFor="upload-input"
              className="client-upload-btn my-[25px] relative cursor-pointer flex justify-center gap-3 pt-2"
            >
              <ClientUploadIcon className="!text-transparent" />
              Upload photo
            </label>
            <input
              id="upload-input"
              type="file"
              name="photo"
              onChange={onFileChange}
              accept="image/*"
              multiple={true}
              className="hidden"
            />
          </div>
        </FormProvider>
      )}
    </>
  );
};
