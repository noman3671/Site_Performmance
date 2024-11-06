// Make sure the shape of the default value passed to
// createContext matches the shape that the consumers expect!
import React, {createContext, useEffect, useState} from "react";
export const ActionsContext = createContext({
    actionState: {
        loading: false
    },
    changeActionState: () => {},
});

export let ActionsContextProxy = {}

export const ActionsProvider = (props) => {
    const [state, setState] = useState(
        {
            actionState: {
                loading: false
            },
            changeActionState: (action) => {
                let newState = {...state};
                newState.actionState = {...newState.actionState, ...action}
                setState(Object.assign(state, newState))
                setState({...state, actionState: {...state.actionState, ...action}})
            },
        }
    )

    useEffect(() => {
        ActionsContextProxy = Object.assign(ActionsContextProxy, state);
    }, [])

    return(
        <div>
            <ActionsContext.Provider value={state}>
                {props.children}
            </ActionsContext.Provider >
        </div>
    )
}

export const useActionsContext = () => {
    return React.useContext(ActionsContext);
}