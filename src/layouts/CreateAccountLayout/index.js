import {Outlet, useOutletContext} from 'react-router-dom';
import "./style.scss"
import React, { useEffect } from "react";
import BgEllipsLeft from "assets/icons/dashboard/bg-ellipse-left.svg?react";
import BgEllipsRigh from "assets/icons/dashboard/bg-ellipse-right.svg?react";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const { setContext } = useOutletContext()

    useEffect(() => {
        setContext({
            layoutAdditionalClass: 'b-layout--create-account',
            children: {
                insideLayout: <>
                    <BgEllipsLeft className={'absolute left-[125px] top-[240px]'}/>
                    <BgEllipsRight className={'absolute right-[125px] bottom-[330px]'}/>
                </>
            }
        })
    }, [])

    return <Outlet />
}