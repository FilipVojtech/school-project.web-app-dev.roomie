import { Metadata } from "next";
import Header from "@/app/(app)/Header";
import React from "react";

export const metadata: Metadata = {
    title: "Fridge",
}

export default function Fridge() {
    return <>
        <Header title="Fridge"/>
        Welcome to fridge
    </>;
};
