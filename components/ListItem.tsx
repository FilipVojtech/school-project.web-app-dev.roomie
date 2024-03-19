import React from "react";
import { clsx } from "clsx";

export default function ListItem({ title, className, children, interactive = true }: {
    title?: string;
    className?: string;
    children?: React.ReactNode;
    interactive?: boolean;
}) {
    return <div className={ clsx("rounded-md bg-blue-100 p-2 h-min", { "interactive": interactive }) }>
        { title && <h3 className="text-2xl pb-1">{ title }</h3> }
        <div className={ className }>
            { children && children }
        </div>
    </div>;
}
