"use client";

import React, { EventHandler, useState } from "react";
import type { SetStateAction } from 'react';
import { CaptionProps, DayClickEventHandler, DayPicker, useNavigation } from "react-day-picker";
import { format, formatISO, parseISO } from "date-fns";
import "react-day-picker/dist/style.css";
import "@/styles/dayCalendar.css"
import { CalendarFold, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function DatePicker() {
    const router = useRouter();
    const segments = usePathname().split("/");
    const [ date, setDate ] = useState<Date>(parseISO(segments[segments.length - 1]));

    function onSelect(date: Date) {
        setDate(date);
        router.replace(`/calendar/${ formatISO(date, { representation: "date" }) }`);
    }

    return <div className="mb-[5px] md:mb-0 md:mr-[10px] contents md:block">
        <DayPicker
            mode="single"
            selected={ date }
            // @ts-ignore
            onSelect={ (date) => onSelect(date) }
            showOutsideDays={ true }
            weekStartsOn={ 1 }
            components={ { Caption: CustomCaption } }
        />
    </div>;
};

function CustomCaption(props: CaptionProps) {
    const { nextMonth, previousMonth, goToMonth } = useNavigation();
    return <div className="rdp-caption">
        <div className="rdp-caption_label">{ format(props.displayMonth, "MMMM yyy") }</div>
        <div>
            <button
                disabled={ !previousMonth }
                onClick={ () => previousMonth && goToMonth(previousMonth) }
                className="rdp-button_reset rdp-button rdp-nav_button"
            >
                <ChevronLeft/>
            </button>
            <button
                onClick={ () => goToMonth(new Date()) }
                className="rdp-button_reset rdp-button rdp-nav_button"
            >
                <CalendarFold/>
            </button>
            <button
                disabled={ !nextMonth }
                onClick={ () => nextMonth && goToMonth(nextMonth) }
                className="rdp-button_reset rdp-button rdp-nav_button"
            >
                <ChevronRight/>
            </button>
        </div>
    </div>
}
