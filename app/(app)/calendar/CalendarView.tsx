"use client";

import React, { useState } from "react";
import Calendar from 'react-lightweight-calendar';

export default function CalendarView() {
    const [ currentDate, setCurrentDate ] = React.useState('2024-03-15');

    return <>
        <Calendar
            currentDate={ currentDate }
            setCurrentDate={ setCurrentDate }
            weekStartsOn={ 1 }
        />
    </>;
}
