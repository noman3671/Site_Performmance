import React, { useState, forwardRef, useEffect } from "react";
import Select, { components } from "react-select";
import { CheckBoxCustomStyle } from "./checkboxStyle";
import InfoCircle from "../../../assets/icons/info-circle.svg?react";
import ChevronIcon from "../../../assets/icons/chevron-left.svg?react";
import { Button } from "@aws-amplify/ui-react";
import { useLoggedIn } from "context/LoggedInContext";
import { useNavigate } from "react-router-dom";
import { useModalContext } from "context/ModalContext";

const InputOption = forwardRef(
  (
    { getStyles, isFocused, isSelected, children, innerProps, data, ...rest },
    ref
  ) => {
    const [isActive, setIsActive] = useState(false);
    const onMouseDown = () => setIsActive(true);
    const onMouseUp = () => setIsActive(false);
    const onMouseLeave = () => setIsActive(false);

    let bg = "transparent";
    if (isFocused) bg = "#f0f0f0";
    if (isActive) bg = "#e0e0e0";

    const style = {
      alignItems: "center",
      backgroundColor: bg,
      color: "#000",
      display: "flex",
      gap: "8px",
      border: "none",
      fontSize: "15px",
      lineHeight: "24px",
      fontWeight: 400,
      fontFamily: "Montserrat",
    };

    const radioContainerStyle = {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#000",
      borderRadius: "100px !important",
    };

    const radioStyle = {
      accentColor: isSelected ? "#2B364B" : "#999",
      height: "18px",
      width: "18px",
      color: "#000",
      borderRadius: "100px !important",
    };

    const props = {
      ...innerProps,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      style,
    };

    return (
      <components.Option
        {...rest}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={props}
        ref={ref}
      >
        <div
          className="select-box select_main_container w-full"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <div style={radioContainerStyle}>
            <input
              type="radio"
              checked={isSelected}
              readOnly
              style={{
                ...radioStyle,
                borderRadius: "50%",
              }}
            />
          </div>
          <span className="font-bold text-[14px] font-[Montserrat] text-[#2B364B] leading-[24px]">
            {children}
          </span>
        </div>
      </components.Option>
    );
  }
);

// Dropdown indicator customization
const DropdownIndicator = forwardRef((props, ref) => {
  return (
    <components.DropdownIndicator {...props} ref={ref}>
      {/* Custom indicator */}
    </components.DropdownIndicator>
  );
});

const RadioSelect = forwardRef(
  (
    {
      options,
      className,
      closeMenuOnSelect = true,
      isDisabled,
      selectedValue,
      reactSelectClassName,
      onChange,
      height,
      name,
      ...rest
    },
    ref
  ) => {
    const [selectedOption, setSelectedOption] = useState(selectedValue || null);
    const { user, setIsAction } = useLoggedIn();
    const { toggleModal } = useModalContext();
    const navigate = useNavigate();

    useEffect(() => {
      if (!user || !options?.length) {
        setSelectedOption(null); 
      } else if (!selectedOption && options.length > 0) {
        const firstOption = options[0];
        setSelectedOption(firstOption);
        onChange(firstOption);
      }
    }, [user, options]);

    const handleChange = (option) => {
      setSelectedOption(option);
      onChange(option);
    };

    const getOptionLabel = (option) => {
      const label = option.name || option.label;
      return label?.charAt(0)?.toUpperCase() + label?.slice(1)?.toLowerCase();
    };

    const customStyles = {
      ...CheckBoxCustomStyle,
      menu: (provided) => ({
        ...provided,
        maxWidth: user ? "295px" : "auto",
        maxHeight: user ? "198px" : "auto",
        overflowY: "auto",
        zIndex: 10,
      }),
      control: (base, state) => ({
        ...base,
        borderColor: "#999",
        boxShadow: "#999",
        borderRadius: "100px !important",
        height: height ? height : "40px",
        "&:hover": {
          borderColor: "#999 !important",
          boxShadow: "#999 !important",
        },
        "&:focus-within": {
          borderColor: "#999 !important",
          boxShadow: "#999 !important",
        },
      }),
    };

    const handleSelectHorse = () => {
      setIsAction("createHorse");
      if (!user) {
        toggleModal("isLoginModalOpen");
      } else if (user) {
        navigate("/user/horses");
      }
    };

    return (
      <>
        <Select
          ref={ref}
          value={selectedOption}
          isMulti={false}
          closeMenuOnSelect={closeMenuOnSelect}
          isClearable={false}
          isDisabled={isDisabled}
          isSearchable={false}
          menuPortalTarget={null}
          menuShouldBlockScroll={false}
          menuShouldScrollIntoView={false}
          hideSelectedOptions={false}
          captureMenuScroll={false}
          getOptionLabel={getOptionLabel}
          onChange={handleChange}
          options={options}
          noOptionsMessage={() => (
            <div className={`flex flex-col justify-center items-center`}>
              <p className="select_horse_heading">Select a Horse</p>
              <div className="w-[245px] h-[104px] select_container mt-[10px]">
                <div className="flex gap-x-[8px]">
                  <InfoCircle />
                  <p className="no_horse_profile_found w-[165px]">
                    No horse profile found
                  </p>
                </div>
                <Button
                  onClick={handleSelectHorse}
                  className="btn_horse_profile"
                >
                  Add Horse Profile
                  <ChevronIcon />
                </Button>
              </div>
            </div>
          )}
          components={{
            Option: InputOption,
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          name={name}
          {...rest}
          classNamePrefix={`react-select`}
          className={`custom-multi-select ${className} ${
            user ? "" : "non_user"
          }`}
          styles={customStyles}
        />
      </>
    );
  }
);

export default RadioSelect;
