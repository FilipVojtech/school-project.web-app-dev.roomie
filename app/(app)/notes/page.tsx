import { Metadata } from "next";
import Header from "@/app/(app)/Header";
import React from "react";

export const metadata: Metadata = {
    title: "Notes",
}

export default function Notes() {
    return <>
        <Header title="Notes"/>
        Welcome to notes
    </>;
};
