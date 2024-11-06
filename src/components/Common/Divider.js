import {Divider} from "@aws-amplify/ui-react";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({size = 'small', color = "secondary", className}) => {
    return <Divider size={size} className={`!border-${color} opacity-[33] ${className}`}></Divider>
}