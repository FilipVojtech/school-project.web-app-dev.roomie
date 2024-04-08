import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Calendar",
}

export default function Calendar() {
    const data: { [key: string]: [ { id: number, title: string } ] } = {
        "Wed Apr 10 2024": [ { id: 1, title: "Recycle bins" } ],
        "Mon Apr 08 2024": [ { id: 2, title: "General waste" } ],
    };

    return <>
    </>;
};
