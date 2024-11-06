import tw, { css } from "twin.macro";
import { useForm, useFormContext } from "react-hook-form";
import {
  validationMessageWithDefault,
  validationRules,
} from "utils/validationErrorMessages";
import { useEffect, useMemo, useState } from "react";
import pickBy from "lodash/pickBy";
import isFunction from "lodash/isFunction";
import mapValues from "lodash/mapValues";

const uid = function () {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const TextArea = ({
  autoFocus,
  hidden,
  disabled,
  onInput: onInputR = () => {},
  type = "text",
  name: nameR = null,
  register: registern = () => {},
  label,
  validations = {},
  required,
  placeholder,
  className,
  methods: methodsR = null,
  validateOnChange = true,
  rows,
  cols,
}) => {
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

  return (
    <>
      <div
        className={`form-input ${className}`}
        tw="flex flex-col"
        css={[hidden && tw`hidden`]}
      >
        {label && (
          <label
            tw="mb-[8px]"
            css={[
              validations.required &&
                tw`after:content-[' *'] after:text-red-500 after:text-[16px]`,
            ]}
            htmlFor={name}
          >
            {label}
          </label>
        )}
        <textarea
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
          autoComplete={"off"}
          aria-autocomplete={"none"}
          readOnly={disabled}
          tw="p-[16px] rounded-[8px] border border-[#999] h-full"
          onInput={onInput}
          name={name}
          type={type}
          placeholder={placeholder}
          rows={rows && rows}
          cols={cols && cols}
        />
        {errorsr[name] ? (
          <span css={[formInputErrors]} className={"form-input__error"}>
            {" "}
            {validationMessageWithDefault(
              errorsr[name],
              label?.toLowerCase(),
              null,
              validations[errorsr[name]?.type]
            )}{" "}
          </span>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

const formInputErrors = css`
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  color: var(--color-primary-danger);
  ${tw`mt-[8px]`}
`;

export default TextArea;
