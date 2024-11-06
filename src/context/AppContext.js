import React, {useEffect, useReducer} from 'react';
import {reducer as AuthStoreReducer, initialState as AuthStore} from "store/AuthStore";
import {reducer as HorseStoreReducer, initialState as HorseStore} from "store/HorseStore";
import {reducer as SaddleStoreReducer, initialState as SaddleStore} from "store/SaddleStore";

const CustomContext = React.createContext();

export function useAppContext() {
    return React.useContext(CustomContext);
}

export let AppContextProxy = []

export function reducer(state, action = {}) {
    switch (action.module) {
        case 'AuthStore':
            state = {
                ...state,
                AuthStore: AuthStoreReducer.apply(this, [state.AuthStore, action])
            }
            return state;
        case 'HorseStore':
            state = {
                ...state,
                HorseStore: HorseStoreReducer.apply(this, [state.HorseStore, action])
            }
            return state;
        case 'SaddleStore':
            state = {
                ...state,
                SaddleStore: SaddleStoreReducer.apply(this, [state.SaddleStore, action])
            }
            return state;

        default:
            return state;
    }

    // eslint-disable-next-line no-unreachable
    return state;
}

export const initialState = {
    AuthStore: AuthStore(),
    HorseStore: HorseStore(),
    SaddleStore: SaddleStore(),
}

export const AppContextProvider = (props) => {
    const modalState = useReducer(reducer, initialState);

    useEffect(() => {
        AppContextProxy = Object.assign(AppContextProxy, modalState)
    }, modalState)

    return (
        <div>
            <CustomContext.Provider value={modalState}>
                {props.children}
            </CustomContext.Provider>
        </div>
    )

}

export default CustomContext;