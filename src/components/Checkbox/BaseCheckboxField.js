// import {CheckboxField, Radio, RadioGroupField} from "@aws-amplify/ui-react";
import {RadioChecked, RadioUnchecked} from "components/Icons";
import {useEffect, useMemo} from "react";
import React, {useReducer} from 'react';

export default ({value, checked = false}) => {
    const [context, action] = useCheckboxFieldContext();
    const isChecked = useMemo(() => context.checked.includes(value), [context.checked, value]);

    useEffect(() => {
        action({type: 'register', payload: value})
    }, [])

    useEffect(() => {
        if (checked && !isChecked) {
            action({type: 'addChecked', payload: value})
        } else if (!checked && isChecked) {
            action({type: 'removeChecked', payload: value})
        }
    }, [checked])

    const onClickHandler = () => {
        if (!isChecked) {
            action({type: 'addChecked', payload: value})
        } else {
            action({type: 'removeChecked', payload: value})
        }
    }

    return <span tw="cursor-pointer" onClick={onClickHandler}>
        { isChecked ?
            <RadioChecked className={'!w-[32px] !h-[32px]'} viewBox={{width: 32, height: 32}}></RadioChecked> :
            <RadioUnchecked className={'!w-[32px] !h-[32px]'} viewBox={{width: 32, height: 32}}></RadioUnchecked>
        }
    </span>
}

const CustomContext = React.createContext();

export function useCheckboxFieldContext() {
    return React.useContext(CustomContext);
}

export const CheckboxFieldProvider=({onChecked, setValues, children})=>{
    const state = useReducer((state, action) => {
        switch (action.type) {
            case 'addChecked': {
                if (state.checked.includes(action.payload)) break;
                const newItems = [...state.checked]
                newItems.push(action.payload);
                state = {
                    ...state,
                    checked: newItems
                }
                setTimeout(() => {
                    onChecked && onChecked(action.payload)
                    setValues && setValues([...state.checked])
                })
                break;
            }
            case 'removeChecked': {
                let newItems = [...state.checked]
                newItems.forEach((item, index) => item === action.payload && newItems.splice(index, 1));
                state = {
                    ...state,
                    checked: newItems
                }
                setTimeout(() => {
                    setValues && setValues([...state.checked])
                })
                break;
            }
            case 'checkAll':
                state = {
                    ...state,
                    checked: [...state.all]
                }
                setTimeout(() => {
                    onChecked && onChecked([...state.all])
                    setValues && setValues([...state.checked])
                })
                break
            case 'register': {
                if (state.all.includes(action.payload)) break;
                const newItems = [...state.all]
                newItems.push(action.payload);
                state = {
                    ...state,
                    all: newItems
                }
                break;
            }
        }

        return state;
    }, {checked: [], all: []});

    return <CustomContext.Provider value={state}>
        {children}
    </CustomContext.Provider >

}