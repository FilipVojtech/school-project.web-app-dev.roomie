import React from "react";
import DatePicker from "@/app/(app)/calendar/DatePicker";
import Header from "@/components/Header";

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
    return <>
        <Header title="Calendar"/>
        <main className="flex">
            <DatePicker/>
            { children }
        </main>
    </>
};
