import { Metadata } from "next";
import Header from "@/app/(app)/Header";
import React from "react";

export const metadata: Metadata = {
    title: "Calendar",
}

export default function Calendar() {
    return <>
        <Header title="Calendar"/>
        Welcome to calendar
    </>;
};
