import {ToggleButton, ToggleButtonGroup} from "@aws-amplify/ui-react";
import tw, {css} from "twin.macro";
import {useForm, useFormContext} from "react-hook-form";
import {useEffect, useMemo, useState} from "react";
import {isPresent, validationMessageWithDefault, validationRules} from "utils/validationErrorMessages";
import pickBy from "lodash/pickBy";
import isFunction from "lodash/isFunction";
import mapValues from "lodash/mapValues";

const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default ({items, value, label, autoFocus, hidden, disabled, onInput: onInputR = () => {
}, type = 'text', name: nameR = null, register: registern = () => {
}, validations = {}, required, placeholder, className, methods: methodsR = null, validateOnChange = true}) => {
    const methods = useFormContext()
    const [name] = useState(nameR || uid())
    const [errorsr, setErrorsR] = useState({})
    const customForm = useForm()

    const validationForm = useMemo(() => methods || customForm, [methods, customForm]);
    const defaultValidations = useMemo(() => pickBy(validations, pickBy(validations, (v, k) => !validationRules[k])), [validations]);
    let customValidations = useMemo(
        () =>
            mapValues(
                pickBy(validations, (v, k) => !!validationRules[k]),
                (v, k) => isFunction(v) ? v : validationRules[k].apply(this, [v])
            )
        , [validations]);

    const onInput = function () {
        var fn = onInputR; // because we call it on the function itself
        // let's copy the rest from makeSafe()
        return function () {
            const $this = this;
            const $arguments = arguments;
            return function () {
                const out = fn.apply($this, $arguments);

                if (validateOnChange) {
                    setTimeout(() => {
                        validationForm?.trigger(name);
                    }, 1);
                }

                return out;
            }();
        };
    }()

    useEffect(() => {
        const fn = async () => {
            setTimeout(() => {
                setErrorsR({...validationForm?.formState.errors})
            }, 1)
        }

        fn();
    }, [validationForm?.formState])

    const {register, unregister, getValues, setValue, formState: {isDirty, errors}, setFocus} = methodsR || methods || customForm;

    const [localValue, setLocalValue] = useState(getValues(name));

    customValidations.isPresent = typeof required !== "undefined" && required !== false ? isPresent(true) : false;

    useEffect(() => {
        setValue(name, localValue);
    }, [localValue])

    useEffect(() => {
        if (autoFocus) {
            setFocus(name);
        }

        return () => {
            unregister(name)
        }
    }, [name])

    return <div css={[styles]} className={'form-toggle-button'}>
        <input readOnly {...register(name, {
            ...validations,
            validate: mapValues(customValidations, (fn) => fn.bind({
                form: methods,
                name: name,
                label: label,
            }))
        })} className={'hidden'}/>
        {label && <label tw="mb-[8px]"
                         css={[validations.required && tw`after:content-[' *'] after:text-red-500 after:text-[12px]`]}
                         htmlFor={name}>
            {label}
        </label> }
        <ToggleButtonGroup
            gap={'10px'}
            className={'!mt-[8px]'}
            value={localValue}
            onChange={(value) => {setLocalValue(value); onInput()}}
            isExclusive
            isSelectionRequired
        >
            {
                items.map((item, index) => {
                    return <ToggleButton key={index} value={item.value}>{item.name}</ToggleButton>
                })
            }
        </ToggleButtonGroup>
        {errorsr[name] ? <span css={[formInputErrors]}
                               className={'form-input__error'}> {validationMessageWithDefault(errorsr[name], label.toLowerCase(), null, validations[errorsr[name].type])} </span> : ''}
    </div>
}

const styles = css`
    .amplify-togglebutton {
      border-radius: 6px !important;
      background: rgba(69, 92, 129, 0.20);
      display: inline-flex;
      padding: 12px 24px;
      justify-content: center;
      align-items: center;
      color: var(--color-primary);
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 16px;
      border: none;
      &[aria-pressed=true] {
        color: var(--color-white-alt);
        background: var(--color-primary);
      }
    }
`

const formInputErrors = css`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 12px;
  color: var(--color-primary-danger);
  ${tw`mt-[8px]`}
`