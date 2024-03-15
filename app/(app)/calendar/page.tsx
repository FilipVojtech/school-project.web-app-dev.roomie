import { Metadata } from "next";
import Header from "@/components/Header";
import React from "react";
import CalendarView from "@/app/(app)/calendar/CalendarView";

export const metadata: Metadata = {
    title: "Calendar",
}

export default function Calendar() {

    return <>
        <Header title="Calendar"/>
        <main>
            <CalendarView/>
        </main>
    </>;
};
