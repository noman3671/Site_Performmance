import "./style.css";
import React, { useEffect, useRef, useState } from "react";
import ProfileDefaultImage from "assets/images/profileDefaultImage.png";
import {
  CameraIcon,
  ClientHomeIcon,
  ClientPhoneIcon,
  ClientUserIcon,
  EditClientIcon,
  HomeIcon,
  MailIcon,
  PhoneIcon,
} from "components/Icons";
import Button from "components/Buttons";
import { FormInput } from "components/Inputs";
import UploadModal from "components/Modal/UploadImage/UploadImageModal";
import { useUploadContext } from "context/ClientUploadContext";
import verified from "../../assets/images/verified.png";

import { FormProvider, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { UPDATE_USER } from "apollo/mutations/Client";
import ModalStore from "components/Modal/ModalStore";
import { Loader } from "@aws-amplify/ui-react";
import { countries, states } from "./location";
import { GoogleApiWrapper } from "google-maps-react";
import { useModalContext } from "../../context/ModalContext";
import {
  sendUserAttributeVerificationCode,
  updateUserAttribute,
} from "aws-amplify/auth";
import { useLoggedIn } from "../../context/LoggedInContext";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export const CustomMapControl = ({
  searchType,
  onPlaceSelect,
  setPlaceAutocomplete,
  setCountryState,
  setCountryCity,
  setCountryZipcode,
  selectedPlace,
  setSelectedPlace,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google || !inputRef.current) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        fields: ["address_component", "geometry", "name", "formatted_address"],
        types: [searchType],
        componentRestrictions: { country: "us" },
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (place.geometry) {
        onPlaceSelect(place);
      }

      let city, state, zipCode;
      if (!place.address_components) {
        console.error("No address components found.");
        return;
      }

      place.address_components.forEach((component) => {
        const types = component.types;
        if (types.includes("locality")) {
          city = component.long_name;
        } else if (types.includes("administrative_area_level_1")) {
          state = component.short_name;
        } else if (types.includes("postal_code")) {
          zipCode = component.long_name;
        }
      });

      setCountryState(state);
      setCountryCity(city);
      setCountryZipcode(zipCode);
      setSelectedPlace({ name: place.name });
    });

    setPlaceAutocomplete(autocomplete);
  }, [
    onPlaceSelect,
    setPlaceAutocomplete,
    setCountryState,
    setCountryCity,
    setCountryZipcode,
    setSelectedPlace,
  ]);

  useEffect(() => {
    const handleInput = () => {
      if (inputRef.current.value === "") {
        setSelectedPlace({ name: null });
        setCountryState("");
        setCountryCity("");
        setCountryZipcode("");
      }
    };

    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener("input", handleInput);
    }

    return () => {
      if (inputElement) {
        inputElement.removeEventListener("input", handleInput);
      }
    };
  }, [setSelectedPlace, setCountryState, setCountryCity, setCountryZipcode]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = selectedPlace?.name || "";
    }
  }, [selectedPlace]);

  return (
    <div className="">
      <div className="flex flex-col relative lg:flex-row justify-between mb-5 items-center gap-[20px]">
        <div className="absolute top-[-10px] left-[10px] w-[100px] flex items-center bg-white z-1 gap-x-2 justify-center">
          <HomeIcon className="!text-transparent !cursor-pointer w-[16px] h-[16px]" />
          <label className="state-heading text-[14px]">Address</label>
        </div>
        <input className="map-input-location" type="text" ref={inputRef} />
      </div>
    </div>
  );
};

const Profile = () => {
  const {clientData, isClientDataLoading: loading} = useLoggedIn();
  const {
    toggleModal,
    editFullName,
    editPhone,
    editAddress,
    setEditFullName,
    setEditPhone,
    setEditAddress,
  } = useModalContext();
  const {
    image,
    imageResult,
    placeAutocomplete,
    setPlaceAutocomplete,
    countryState,
    setCountryState,
    countryCity,
    setCountryCity,
    countryZipcode,
    setCountryZipcode,
  } = useUploadContext();

  const methods = useForm({
    defaultValues: {
      photo: "",
      firstName: "",
      email: "",
      phone: "+1",
      country: { value: "USA", label: "United States" },
      state: "" || countryState,
      zipCode: "" || countryZipcode,
      streetName: "",
      address: "",
      city: "" || countryCity,
    },
  });

  const {
    formState: { isDirty },
  } = methods;
  const [updateUser] = useMutation(gql(UPDATE_USER));

  const [isLoading, setIsLoading] = useState(false);

  const [notificationSettings, setNotificationSettings] = useState(false);

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPlace, setSelectedPlace] = useState({ name: null });

  useEffect(() => {
    if (clientData && clientData.user && clientData.user.notification) {
      setSelectedOption(clientData.user.notification);
    }
    if (clientData && clientData.user && clientData.user.address) {
      setSelectedPlace({ name: clientData.user.address });
    }
  }, [clientData]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setNotificationSettings(true);
  };

  const [isCountryUSA, setIsCountryUSA] = useState(
    clientData?.user?.country === "United States"
  );

  const onClose = () => {
    ref.current.close();
  };

  const UploadModalHandler = () => toggleModal("isUploadModalOpen");

  const handleEditPhone = () => {
    setEditPhone(true);
  };

  const handleEditAddress = () => {
    setEditAddress(true);
  };

  const handleEditFullName = () => {
    setEditFullName(true);
  };

  const handleCancel = () => {
    setEditFullName(false);
    setEditAddress(false);
    setEditPhone(false);
    setNotificationSettings(false);
    setSelectedPlace({ name: clientData.user.address });
  };

  const onHandleUserUpdate = async (data) => {
    const formattedPhoneNumber = data.phone?.replace(/[^\d]/g, "");

    try {
      setIsLoading(true);

      const input_user_data = {
        phone: `+${formattedPhoneNumber}`,
        isPhoneVerified: data?.phone !== clientData.user.phone && false,
        address: selectedPlace?.name,
        zipCode: data?.zipCode,
        streetName: data?.streetName,
        city: data?.city,
        state: typeof data.state === "object" ? data?.state?.label : data.state,
        country: data?.country?.label,
        firstName: data?.firstName,
        lastName: data?.lastName,
        photo: imageResult ? imageResult : clientData?.user?.photo,
        notification: selectedOption,
        saddlePreference: {
          brandName: "",
          condition: "EXCELLENT",
          minFitScore: 1.5,
          newOrUsed: "NEW",
          size: 1.5,
          style: "",
        },
      };

      if (`+${formattedPhoneNumber}` !== clientData.user.phone)
        await updateUserAttribute({
          userAttribute: {
            attributeKey: "phone_number",
            value: `+${formattedPhoneNumber}`,
          },
        });

      await updateUser({
        variables: { input: input_user_data },
        refetchQueries: ["ClientQuery"],
      });

      setEditFullName(false);
      setEditAddress(false);
      setEditPhone(false);
      setNotificationSettings(false);
      ModalStore.openSimpleSuccess({
        title: "SUCCESS!",
        subtitle: "User Updated Successfully",
      });
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyCodeModal = async () => {
    toggleModal("isVerifyPhoneCodeModalOpen");

    try {
      if (
        methods.getValues()?.phone === clientData.user.phone &&
        clientData.user.isPhoneVerified === false
      ) {
        await sendUserAttributeVerificationCode({
          userAttributeKey: "phone_number",
        });
      } else {
        const updateUserResponse = await updateUserAttribute({
          userAttribute: {
            attributeKey: "phone_number",
            value: methods.getValues()?.phone,
          },
        });
        console.log("updateUserResponse", updateUserResponse);
        await updateUser({
          variables: {
            input: {
              phone: methods.getValues()?.phone
                ? methods.getValues()?.phone
                : clientData.user.phone,
            },
          },
          refetchQueries: ["ClientQuery"],
        });
        const sendUserCodeResponse = await sendUserAttributeVerificationCode({
          userAttributeKey: "phone_number",
        });
        console.log("sendUserCodeResponse", sendUserCodeResponse);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePhoneNumberChange = (event) => {
    let value = event.target.value?.replace(/\D/g, "");

    if (value.startsWith("1")) {
      value = value.slice(1);
    }

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    if (value.length > 6) {
      value = `+1 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
        6
      )}`;
    } else if (value.length > 3) {
      value = `+1 (${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 0) {
      value = `+1 (${value}`;
    } else {
      value = "+1";
    }

    methods?.setValue("phone", value);
  };

  useEffect(() => {
    if (clientData) {
      methods.reset({
        photo: clientData.user.photo,
        firstName: clientData.user.firstName,
        email: clientData.user.email,
        phone: clientData.user.phone || "+1",
        zipCode: clientData.user.zipCode,
        streetName: clientData.user.streetName,
        address: { name: clientData.user.address },
        state: {
          value: clientData?.user?.state,
          label: clientData?.user?.state,
        },
        city: clientData.user.city,
        country: {
          value: clientData.user.country || "USA",
          label: clientData.user.country || "United States",
        },
      });
    }
  }, [clientData, methods, editAddress, editFullName, editPhone]);

  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === "country") {
        setIsCountryUSA(value.country.label === "United States");
      }
    });
    return () => subscription.unsubscribe();
  }, [methods.watch]);

  useEffect(() => {
    if (selectedPlace?.name) {
      methods.setValue("city", countryCity || "");
      methods.setValue(
        "state",
        {
          value: countryState ?? "",
          label: countryState ?? "",
        } || ""
      );
      methods.setValue("zipCode", countryZipcode || "");
    } else {
      methods.setValue("city", "");
      methods.setValue("state", "");
      methods.setValue("zipCode", "");
    }
  }, [selectedPlace?.name, countryCity, countryState, countryZipcode, methods]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] w-full">
        <Loader
          filledColor="#2b364b"
          className="!h-[50px] !flex !items-center !text-center !justify-center"
        />
      </div>
    );
  }

  const renderForm = () => (
    <div className="mb-[120px] mt-[126px] w-full px-5 lg:w-[75%] mx-auto">
      <div className="flex items-center w-full gap-[31px]">
        <div className="relative">
          {!loading && (
            <>
              <img
                src={
                  imageResult
                    ? imageResult
                    : clientData?.user?.photo
                    ? clientData?.user?.photo
                    : ProfileDefaultImage
                }
                alt="profile image"
                className="profile-pic w-[85px] h-[85px] rounded-full"
              />
              <div
                onClick={UploadModalHandler}
                className="camera-icon z-0 flex items-center justify-center cursor-pointer absolute w-[42px] h-[42px] rounded-full bg-[#5C80B6] hover:bg-gray-500 hover:bg-opacity-95 hover:animate-pulse mb-[-10px] bottom-0 left-12"
              >
                <CameraIcon className="!text-transparent" />
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-[20px]">
          {editFullName ? (
            <FormInput
              type="text"
              name="firstName"
              className="w-[239px] lg:w-[399px]"
              icon={<ClientUserIcon className="!text-transparent" />}
              label="Full name*"
              placeholder={"Enter your name here"}
            />
          ) : (
            <h2 className="client-name_title">{clientData?.user?.firstName}</h2>
          )}
          {!editFullName && (
            <EditClientIcon
              className="!text-transparent !cursor-pointer"
              onClick={handleEditFullName}
            />
          )}
        </div>
      </div>
      <div className="mt-[35px]">
        <p className="contact_text capitalize">Contact information</p>
        <div className="flex flex-wrap mt-[44px] gap-[20px] xl:gap-[35px]">
          <div className="flex items-center flex-wrap gap-[18px]">
            <>
              <MailIcon className="!text-transparent !cursor-pointer" />
              <p className="contact_info">{clientData?.user?.email}</p>
            </>
            <div className="flex items-center gap-2 lg:gap-[18px]">
              {!editPhone && (
                <PhoneIcon className="!text-transparent !cursor-pointer" />
              )}
              {editPhone ? (
                <div className="relative">
                  <FormInput
                    icon={<ClientPhoneIcon className="!text-transparent" />}
                    type={"tel"}
                    label={"Phone Number"}
                    name={"phone"}
                    placeholder={"+14844578306"}
                    className="w-[90vw] md:w-[335px] xl:w-[399px]"
                    validateOnChange={false}
                    validations={{
                      required: true,
                      pattern: {
                        value:
                          /^(?:\+1\s?)?\(?([2-9][0-8][0-9])\)?[-.●\s]?([2-9][0-9]{2})[-.●\s]?([0-9]{4})$/,
                        message: "Invalid phone number format",
                      },
                    }}
                    onChange={handlePhoneNumberChange}
                  ></FormInput>
                </div>
              ) : (
                <>
                  <p className="contact_info">{clientData?.user?.phone}</p>
                </>
              )}
              {!editPhone && (
                <div className="flex items-center gap-x-3">
                  {clientData?.user?.isPhoneVerified && (
                    <img src={verified} alt="verified" className="w-5 h-5" />
                  )}

                  {(!clientData?.user?.isPhoneVerified &&
                  clientData?.user?.phone?.length) ? (
                    <Button
                      className={`phone-verify_btn !w-[10px] !h-[10px]  bg-white border-2 border-[#2B364B]  text-[#2B364B]`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onVerifyCodeModal();
                      }}
                    >
                      Verify
                    </Button>
                  ) : null}
                  <EditClientIcon
                    className="!text-transparent !cursor-pointer"
                    onClick={handleEditPhone}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center flex-wrap gap-[8px] md:gap-[18px]">
            {!editAddress && (
              <HomeIcon className="!text-transparent !cursor-pointer" />
            )}
            {editAddress ? (
              <div className="flex flex-wrap gap-[20px]">
                <CustomMapControl
                  searchType="geocode"
                  onPlaceSelect={setSelectedPlace}
                  placeAutocomplete={placeAutocomplete}
                  setPlaceAutocomplete={setPlaceAutocomplete}
                  setCountryState={setCountryState}
                  setCountryCity={setCountryCity}
                  setCountryZipcode={setCountryZipcode}
                  selectedPlace={selectedPlace}
                  setSelectedPlace={setSelectedPlace}
                />

                {isCountryUSA ? (
                  <FormInput
                    name="state"
                    type="select"
                    height="56px"
                    className="w-[90vw] md:w-[335px] xl:w-[198px]"
                    icon={<ClientHomeIcon className="!text-transparent" />}
                    label="State"
                    options={states}
                    placeholder={"Select one"}
                    isDisabled
                  />
                ) : (
                  <FormInput
                    name="state"
                    type="text"
                    className="w-[90vw] md:w-[335px] xl:w-[198px]"
                    icon={<ClientHomeIcon className="!text-transparent" />}
                    label="State"
                    placeholder={"Type state here"}
                    isDisabled
                  />
                )}

                <FormInput
                  icon={<ClientHomeIcon className="!text-transparent" />}
                  className="w-[90vw] md:w-[335px] xl:w-[198px]"
                  type="text"
                  name="zipCode"
                  label="Zip code"
                  placeholder={"Type here"}
                  disabled
                />
                <FormInput
                  type="text"
                  name="city"
                  className="w-[90vw] md:w-[335px] xl:w-[198px]"
                  icon={<ClientHomeIcon className="!text-transparent" />}
                  placeholder={"Type here"}
                  label="City"
                  disabled
                />
                <FormInput
                  name="country"
                  type="select"
                  height="56px"
                  isDisabled
                  className="!w-[90vw] md:!w-[335px] lg:!w-[335px] xl:!w-[198px]"
                  icon={<ClientHomeIcon className="!text-transparent" />}
                  label="Country"
                  options={countries}
                  placeholder={"Select one"}
                  onChange={(e) => setIsCountryUSA(e.target.value === "USA")}
                />
              </div>
            ) : (
              <p className="contact_info">
                {clientData?.user?.address && `${clientData.user.address}, `}
                {clientData?.user?.state && `${clientData.user.state}, `}
                {clientData?.user?.zipCode && `${clientData.user.zipCode}, `}
                {clientData?.user?.city && `${clientData.user.city}, `}
                {clientData?.user?.country && `${clientData.user.country}`}
              </p>
            )}
            {!editAddress && (
              <EditClientIcon
                className="!text-transparent !cursor-pointer"
                onClick={handleEditAddress}
              />
            )}
          </div>
        </div>
        <div className="mt-10">
          <p className="notification-settings capitalize">
            Notification Settings
          </p>

          <form className="mt-5">
            <div className="space-x-2">
              <input
                type="radio"
                id="email"
                name="option"
                value="email"
                checked={selectedOption === "email"}
                onChange={handleOptionChange}
              />
              <label htmlFor="email" className="label-text">
                Email
              </label>
            </div>
            <div className="space-x-2">
              <input
                type="radio"
                id="phone"
                name="option"
                value="phone"
                checked={selectedOption === "phone"}
                onChange={handleOptionChange}
              />
              <label htmlFor="phone" className="label-text">
                Phone Number
              </label>
            </div>
            <div className="space-x-2">
              <input
                type="radio"
                id="both"
                name="option"
                value="both"
                checked={selectedOption === "both"}
                onChange={handleOptionChange}
              />
              <label htmlFor="both" className="label-text">
                Both
              </label>
            </div>
          </form>
        </div>
        <div className="border-b-2 border-dashed border-[#9C765B] mt-[83px]" />
        {(editFullName || editPhone || editAddress || notificationSettings) && (
          <div className="flex flex-wrap lg:flex-row flex-col mt-[40px] justify-end gap-[44px]">
            <Button
              whiteOutline
              className={`client-prof_save_btn bg-[#2B364B] text-white ${
                isDirty ? "bg-[#2B364B] text-[#fff]" : ""
              }`}
              type="submit"
              loading={isLoading}
            >
              Save Changes
            </Button>
            <Button
              transparent
              className={`client-prof_cancel_btn border-2 border-[#2B364B]  text-[#2B364B] ${
                isDirty ? "border-2 border-[#2B364B]  text-[#2B364B]" : ""
              }`}
              type="button"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
      <UploadModal image={image} />
    </div>
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onHandleUserUpdate)}>
        {renderForm()}
      </form>
    </FormProvider>
  );
};

export default GoogleApiWrapper({
  apiKey: API_KEY,
  LoadingContainer: "div",
})(Profile);
