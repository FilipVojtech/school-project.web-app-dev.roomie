import { Metadata } from "next";
import Header from "@/components/Header";
import React from "react";
import FridgeItem from "@/components/fridge/FridgeItem";

export const metadata: Metadata = {
    title: "Fridge",
}

export default function Fridge() {
    return <>
        <Header title="Fridge"/>
        Welcome to fridge
    </>;
};
