import React from "react";
import { clsx } from "clsx";

export default function ListItem({ className, children }: { className?: string, children: React.ReactNode }) {
    return <div className={ clsx("rounded-md bg-blue-100 p-2", className) }>
        { children }
    </div>;
}
