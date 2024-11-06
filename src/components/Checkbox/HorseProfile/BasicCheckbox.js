import "./style.css";
import React, { useState, forwardRef } from "react";
import Select, { components } from "react-select";
import { CheckBoxCustomStyle } from "./checkboxStyle";

const InputOption = ({
  getStyles,
  Icon,
  isFocused,
  isSelected,
  children,
  innerRef,
  innerProps,
  ...rest
}) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  let bg = "transparent";
  if (isFocused) bg = "bg-transparent";
  if (isActive) bg = "bg-transparent";
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

  const checkboxContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "8px",
    color: "#000",
    borderRadius: "100px !important",
  };

  const checkboxStyle = {
    accentColor: isSelected ? "#5B7FB4" : "#5B7FB4",
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
      innerRef={innerRef}
    >
      <div
        className="select-box"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div style={checkboxContainerStyle}>
          <input
            type="checkbox"
            checked={isSelected}
            {...props}
            ref={innerRef}
            onChange={() => rest?.selectOption(rest?.data)}
            disabled={rest?.isDisabled}
            style={{ ...checkboxStyle, borderRadius: "100%" }}
          />
        </div>
        <span>{children}</span>
      </div>
    </components.Option>
  );
};

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      {/* <ChevronDownIcon className="!bg-yellow-300 !mb-[15px] fixed !mr-[10px] !text-transparent" /> */}
    </components.DropdownIndicator>
  );
};

const CheckboxSelect = forwardRef(
  (
    {
      options,
      className,
      isMulti,
      closeMenuOnSelect,
      isDisabled,
      selectedValues,
      height,
      reactSelectClassName,
      onChange,
      name,
      field,
      ...rest
    },
    ref
  ) => {
    const multiValueContainer = ({ selectProps, data }) => {
      const label = data.label;
      const allSelected = selectProps?.value;
      const index = allSelected?.findIndex(
        (selected) => selected.label === label
      );
      const isLastSelected = index === allSelected.length - 1;
      const labelSuffix = isLastSelected ? "" : ", ";
      const val = `${label}${labelSuffix}`;
      return val;
    };

    const getOptionLabel = (option) => {
      return option.label;
    };

    const customStyles = {
      ...CheckBoxCustomStyle,
      control: (base, state) => ({
        ...base,
        borderColor: "#999",
        boxShadow: "#999",
        borderRadius: "100px !important",
        height: height ? height : "30px !important",
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

    return (
      <>
        <Select
          {...field}
          ref={ref}
          isMulti={isMulti && isMulti}
          isClearable={false}
          isDisabled={isDisabled && isDisabled}
          closeMenuOnSelect={closeMenuOnSelect}
          isSearchable={false}
          menuShouldBlockScroll={true}
          hideSelectedOptions={false}
          getOptionLabel={getOptionLabel}
          options={options}
          components={{
            MultiValueContainer: multiValueContainer,
            Option: InputOption,
            IndicatorSeparator: () => null,
            DropdownIndicator,
          }}
          name={name && name}
          {...rest}
          classNamePrefix={`react-select`}
          className={`custom-multi-select ${className}`}
          styles={customStyles}
        />
      </>
    );
  }
);

export default CheckboxSelect;
