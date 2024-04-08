"use client";

import React from "react";
import DatePicker from "@/components/calendar/DatePicker";

export default function CalendarPage() {
    const [ date, setDate ] = React.useState<Date>(new Date());
    const data: { [key: string]: [ { id: number, title: string } ] } = {
        "Wed Apr 10 2024": [ { id: 1, title: "Recycle bins" } ],
        "Mon Apr 08 2024": [ { id: 2, title: "General waste" } ],
    };

    return <>
        <div>
            <DatePicker date={ date } setDate={ setDate }/>
        </div>
    </>;
};
