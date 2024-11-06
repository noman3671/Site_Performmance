import {Radio, RadioGroupField} from "@aws-amplify/ui-react";
import {RadioChecked, RadioUnchecked} from "components/Icons";
import {useRadioGroupContext} from "@aws-amplify/ui-react/dist/types/primitives/RadioGroupField/context";
import {useMemo} from "react";
import tw, {css} from "twin.macro"

export default ({value}) => {
    const context = useRadioGroupContext();
    const isChecked = useMemo(() => context.currentValue === value, [context.currentValue, value]);

    const onClickHandler = () => {
        if (!isChecked) {
            context.currentValue = value;
        }
    }

    return <span onClick={onClickHandler}>
        <Radio tw={"hidden"} value={value}></Radio>
        { isChecked ?
            <RadioChecked></RadioChecked> :
            <RadioUnchecked></RadioUnchecked>
        }
    </span>
}