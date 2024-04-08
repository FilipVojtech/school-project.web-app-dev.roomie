"use client";

import React from "react";
import DatePicker from "@/components/calendar/DatePicker";
import CalendarItem from "@/components/calendar/CalendarItem";

export default function CalendarPage() {
    const [ date, setDate ] = React.useState<Date>(new Date());
        "Wed Apr 10 2024": [ { id: 1, title: "Recycle bins" } ],
        "Mon Apr 08 2024": [ { id: 2, title: "General waste" } ],
    const data: { [key: string]: { id: string, title: string }[] } = {
    };

    return <>
        <div>
            <DatePicker date={ date } setDate={ setDate }/>
        </div>

        <div className="flex flex-col grow ">
            { data[date.toDateString()] && data[date.toDateString()].map(
                value => <CalendarItem id={ value.id } title={ value.title } key={ value.id }/>
            ) }
        </div>
    </>;
};
