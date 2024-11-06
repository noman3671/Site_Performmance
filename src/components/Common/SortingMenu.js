import {Menu, MenuItem} from "@aws-amplify/ui-react";
import {Link} from "react-router-dom-middleware";
import {useEffect, useState} from "react";
import {SlArrowDown, SlArrowUp} from "react-icons/sl";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({sortItems = [], value = null, dir = 'asc', onChange = () => {}}) => {
    const [state, setState] = useState({
        sortBy: value,
        sortDir: dir,
    });

    useEffect(() => {
       if (sortItems.length && !state.sortBy) {
           setState({...state, sortBy: sortItems[0].value})
       }
    }, [sortItems]);

    const changeDir = () => {
        setState({...state, sortDir: state.sortDir === 'asc' ? 'desc' : 'asc'})
    }

    const getName = (value) => {
        return sortItems.find(item => item.value === value)?.name;
    }

    useEffect(() => {
        onChange(state);
    }, [state.sortBy, state.sortDir])


    return <span className="b-table__sort-tab text-[20px] inline-flex items-center">Sort by:{
        <>
            <Menu trigger={
                <Link to={'#'} className={'font-bold text-primary ml-[14px]'}>{getName(state.sortBy)}</Link>
            }>
                {
                    sortItems.map((item, index) => <MenuItem key={index}
                                                             onClick={() => setState({...state, sortBy: item.value})}
                                                             className={`${state.sortBy === item.value && '!bg-primary !text-white'} hover:!bg-primary`}>{item.name}</MenuItem>)
                }
            </Menu>
            <span onClick={changeDir} className={'ml-[10px] text-primary cursor-pointer '}>{state.sortDir === 'asc' ? <SlArrowDown fill={'var(--color-primary)'} size={8}/> : <SlArrowUp fill={'var(--color-primary)'} size={8}/> }</span>
        </>
    }
                    </span>
}