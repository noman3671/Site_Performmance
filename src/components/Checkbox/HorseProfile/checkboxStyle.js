export const CheckBoxCustomStyle = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "transparent" : "transparent",
    height: "56px",
    borderRadius: "100px",
    borderColor: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    maxWidth: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "initial",
  }),

  input: (provided) => ({
    ...provided,
    border: "none",
    borderBottom: "none",
  }),

  
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "transparent" : "transparent",
  }),
  multiValue: (provided, state) => ({
    ...provided,
    backgroundColor: state.data.isFixed ? "transparent" : "transparent",
    // "::after": {
    //   content:
    //     state.selectProps.value.length === 1
    //       ? '""'
    //       : state.selectProps.value.length === state.data.index + 1
    //       ? '" "'
    //       : '" ,"',
    // },
    color: "#999",
    fontSize: "15px",
  }),
  groupHeading: (provided) => ({
    ...provided,
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
  }),
  multiValueLabel: (provided, state) => {
    return {
      ...provided,
      color: "#999",
      fontSize: "15px",
    };
  },

  multiValueRemove: (provided) => ({ ...provided, display: "none" }),
};
