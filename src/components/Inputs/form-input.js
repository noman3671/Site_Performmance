import tw, { css } from "twin.macro";
import { useForm, useFormContext, Controller } from "react-hook-form";
import {
  validationMessageWithDefault,
  validationRules,
} from "utils/validationErrorMessages";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import pickBy from "lodash/pickBy";
import isFunction from "lodash/isFunction";
import mapValues from "lodash/mapValues";
import BasicCheckbox from "components/Checkbox/HorseProfile/BasicCheckbox";
import AdvancedCheckbox from "components/Checkbox/HorseProfile/AdvancedCheckbox";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import RadioSelect from "../Checkbox/HorseProfile/AdvanceRadioSelect";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const FormInput = forwardRef(
  (
    {
      autoFocus,
      reactSelectClassName,
      hidden,
      disabled,
      id,
      isDisabled,
      onInput: onInputR = () => {},
      type = "text",
      options = [],
      value = "",
      isClearable = false,
      selectedValues,
      onChange = () => {},
      onClick = () => {},
      name: nameR = null,
      register: registern = () => {},
      label,
      validations = {},
      required,
      placeholder,
      maxLength,
      props,
      className,
      height,
      closeMenuOnSelect,
      isMulti,
      methods: methodsR = null,
      validateOnChange = true,
      icon,
      readOnly = false,
      showEyeIcon = false,
      showPassword = false,
      onToggleShowPassword,
    },
    ref
  ) => {
    const selec = useRef(null);
    const methods = useFormContext();

    const [name] = useState(nameR || uid());
    const [errorsr, setErrorsR] = useState({});
    const customForm = useForm();
    const validationForm = useMemo(
      () => methods || customForm,
      [methods, customForm]
    );
    const defaultValidations = useMemo(
      () =>
        pickBy(
          validations,
          pickBy(validations, (v, k) => !validationRules[k])
        ),
      [validations]
    );
    const customValidations = useMemo(
      () =>
        mapValues(
          pickBy(validations, (v, k) => !!validationRules[k]),
          (v, k) => (isFunction(v) ? v : validationRules[k].apply(this, [v]))
        ),
      [validations]
    );

    const onInput = (function () {
      var fn = onInputR; // because we call it on the function itself
      // let's copy the rest from makeSafe()
      return function () {
        const $this = this;
        const $arguments = arguments;
        return (function () {
          const out = fn.apply($this, $arguments);

          if (validateOnChange) {
            setTimeout(() => {
              validationForm?.trigger(name);
            }, 1);
          }

          return out;
        })();
      };
    })();

    useEffect(() => {
      const fn = async () => {
        setTimeout(() => {
          setErrorsR({ ...validationForm?.formState.errors });
        }, 1);
      };

      fn();
    }, [validationForm?.formState]);

    const {
      register,
      unregister,
      formState: { isDirty, errors },
      setFocus,
    } = methodsR || methods || customForm;

    validations.required =
      typeof required !== "undefined" && required !== false
        ? true
        : validations.required;

    useEffect(() => {
      if (autoFocus) {
        setFocus(name);
      }

      return () => {
        unregister(name);
      };
    }, [name]);

    const handleInputType = () =>
      type === "password" ? (showPassword ? "text" : "password") : type;

    return (
      <>
        <div
          className={`form-input ${className}`}
          tw="flex flex-col"
          css={[hidden && tw`hidden`]}
        >
          {label && (
            <label
              tw="mb-2 flex"
              css={[
                validations.required &&
                  css`
                    &:after {
                      content: "*";
                      margin-left: 4px; /* Adjust the gap size here */
                      color: black;
                      font-size: 20px;
                    }
                  `,
              ]}
              htmlFor={name}
            >
              {icon && (
                <div tw="flex items-center">
                  <div tw="mr-2">{icon}</div>
                  {label}
                </div>
              )}
              {!icon && label}
            </label>
          )}
          {type === "select" ? (
            <Controller
              name={name}
              control={validationForm?.control}
              defaultValue={[]}
              render={({ field }) => (
                <BasicCheckbox
                  field={field}
                  {...register(name, {
                    ...validations,
                    validate: mapValues(customValidations, (fn) =>
                      fn.bind({
                        form: methods,
                        name: name,
                        label: label,
                      })
                    ),
                  })}
                  options={options}
                  reactSelectClassName={
                    reactSelectClassName && reactSelectClassName
                  }
                  selectedValues={selectedValues && selectedValues}
                  onChange={onChange}
                  isDisabled={isDisabled}
                  height={height}
                  isMulti={isMulti}
                  closeMenuOnSelect={closeMenuOnSelect}
                  placeholder={placeholder}
                  label={label}
                  className={`${className} appearance-none rounded-full !shadow-none focus:outline-none cursor-pointer`}
                />
              )}
            />
          ) : type === "single-select" ? (
            <RadioSelect
              {...register(name, {
                ...validations,
                validate: mapValues(customValidations, (fn) =>
                  fn.bind({
                    form: methods,
                    name: name,
                    label: label,
                  })
                ),
              })}
              name={name}
              options={options}
              reactSelectClassName={
                reactSelectClassName && reactSelectClassName
              }
              selectedValue={selectedValues && selectedValues}
              onChange={(option) => {
                onChange(option);
              }}
              height={height}
              id={id}
              isDisabled={isDisabled}
              closeMenuOnSelect={closeMenuOnSelect}
              isMulti={isMulti}
              placeholder={placeholder}
              label={label}
              className={`${className} appearance-none rounded-full !shadow-none focus:outline-none cursor-pointer`} // Custom styling
            />
          ) : type === "select2" ? (
            <AdvancedCheckbox
              {...register(name, {
                ...validations,
                validate: mapValues(customValidations, (fn) =>
                  fn.bind({
                    form: methods,
                    name: name,
                    label: label,
                  })
                ),
              })}
              name={name}
              options={options}
              reactSelectClassName={
                reactSelectClassName && reactSelectClassName
              }
              selectedValues={selectedValues && selectedValues}
              onChange={onChange}
              height={height}
              id={id}
              isClearable={isClearable}
              isDisabled={isDisabled}
              closeMenuOnSelect={closeMenuOnSelect}
              isMulti={isMulti}
              placeholder={placeholder}
              label={label}
              className={`${className} appearance-none rounded-full !shadow-none focus:outline-none cursor-pointer`}
            />
          ) : (
            <div className="input-icon-wrapper" tw="relative">
              <input
                {...register(name, {
                  ...validations,
                  onChange,
                  validate: mapValues(customValidations, (fn) =>
                    fn.bind({
                      form: methods,
                      name: name,
                      label: label,
                    })
                  ),
                })}
                autoComplete="off"
                aria-autocomplete="none"
                readOnly={readOnly}
                className={`${disabled ? "bg-gray-100" : "bg-transparent"} ${readOnly ? "cursor-not-allowed": "cursor-auto"}`}
                tw="pl-[40px] pr-[16px] h-[56px] rounded-[8px] border border-[#999] w-full"
                onInput={onInput}
                onClick={onClick}
                disabled={disabled}
                name={name}
                maxLength={maxLength}
                type={handleInputType()}
                placeholder={placeholder}
              />
              {showEyeIcon && (
                <button
                  onClick={onToggleShowPassword}
                  tw="absolute inset-y-0 right-2 flex items-center justify-center w-10 h-full text-gray-600 bg-transparent"
                  type="button"
                >
                  {showPassword ? (
                    <AiOutlineEye size={20} />
                  ) : (
                    <AiOutlineEyeInvisible size={20} />
                  )}
                </button>
              )}
            </div>
          )}
          {errorsr[name] ? (
            <span css={[formInputErrors]} className={"form-input__error"}>
              {" "}
              {validationMessageWithDefault(
                errorsr[name],
                label.toLowerCase(),
                null,
                validations[errorsr[name].type]
              )}{" "}
            </span>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
);

const formInputErrors = css`
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  color: var(--color-primary-danger);
  ${tw`mt-[8px]`}
`;

export default FormInput;
