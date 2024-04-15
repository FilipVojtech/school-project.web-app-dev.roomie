"use client";

import React, { ReactNode } from "react";
import { clsx } from "clsx";

export default function SettingsItem({ children, title, icon, onClick, hidden, destructive }: {
    children?: ReactNode,
    title: string,
    icon?: React.JSX.Element,
    onClick?: () => void,
    hidden?: boolean,
    destructive?: boolean
}) {
    if (hidden) {
        return null;
    }

    return <div
        className={ clsx("flex items-center justify-between h-min rounded-md bg-white p-2 gap-1.5 select-none cursor-pointer interactive", { "destructive": destructive }) }
        onClick={ onClick }
    >
        <div className="flex items-center">
            <div className="mr-2">
                { icon && icon }
            </div>
            <h3 className="pb-1 text-xl">{ title }</h3>
        </div>
        <div>
            { children && children }
        </div>
    </div>;
};
