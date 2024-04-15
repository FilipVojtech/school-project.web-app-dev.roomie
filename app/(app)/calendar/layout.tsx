import React from "react";
import Header from "@/components/Header";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Calendar",
}

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
    return <>
        <Header title="Calendar"/>
        <main className="flex flex-col md:flex-row justify-center md:justify-start">
            { children }
        </main>
    </>
};
