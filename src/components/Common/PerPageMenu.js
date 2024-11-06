import {Menu, MenuItem, SelectField} from "@aws-amplify/ui-react";
import {SlArrowDown, SlArrowUp} from "react-icons/sl";
import {useEffect} from "react";
import {css} from "twin.macro";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({
                    items = [], className = '', value = null, dir = 'asc', onChange = () => {
    }
                }) => {
    // useEffect(() => {
    //     if (sortItemsX.length && !state.sortBy) {
    //         setState({...state, sortBy: sortItems[0].value})
    //     }
    // }, [items]);


    return <span css={[style]} className={`${className} b-table__sort-tab text-[20px] inline-flex items-center`}><span className={'mr-[16px]'}>Per page:</span>{
        <>
            <SelectField className={`select-field w-[63px] h-[38px]  ${className}`} label="" labelHidden value={value} onChange={(e) => {
                onChange(e.target.value)
            }} icon={<div className={'flex flex-col gap-[8px]'}>
                <SlArrowUp fill={'var(--color-primary)'} size={10}/>
                <SlArrowDown fill={'var(--color-primary)'} size={10}/></div>}>
                {
                    items.map((item, index) => {
                        return <option key={index} value={item.value}>{item.name}</option>
                    })
                }

            </SelectField>
        </>
    }
                    </span>
}

const style = css`
  .select-field select {
    border-radius: 12px;
    border: 1px solid var(--color-gray);
    padding: 10px 10px;
    min-width: 63px
  }
`