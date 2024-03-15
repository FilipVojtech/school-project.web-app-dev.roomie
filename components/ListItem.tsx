import React from "react";
import { clsx } from "clsx";

export default function ListItem({ className, children, interactive = true }: {
    className?: string,
    children: React.ReactNode,
    interactive?: boolean
}) {
    return <div className={ clsx("rounded-md bg-blue-100 p-2 h-min", className, { "interactive": interactive }) }>
        { children }
    </div>;
}
