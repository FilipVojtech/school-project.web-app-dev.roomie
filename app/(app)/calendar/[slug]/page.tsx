import React from "react";
import DatePicker from "@/components/calendar/DatePicker";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { parseISO } from "date-fns";
import CalendarItem from "@/components/calendar/CalendarItem";
import type { CalendarItem as CalendarItemType } from "@/lib/definitions";
import { fetchEvents } from "@/app/(app)/calendar/_actions";
import Header from "@/components/Header";

export default async function CalendarPage({ params }: { params: { slug: string } }) {
    const date = parseISO(params.slug);
    const data: CalendarItemType[] = await fetchEvents(date);

    return <>
        <Header title="Calendar"/>
        <main className="flex flex-col md:flex-row justify-center md:justify-start">
            <div className="h-max md:sticky top-0 bg-white mb-1">
                <DatePicker/>
                <Button asChild className="w-full md:w-[calc(100%-10px)] mt-2 md:mr-2.5">
                    <Link href="/calendar/add">
                        <Plus className="mr-2 h-4 w-4"/>New event
                    </Link>
                </Button>
            </div>
            <EventItems data={ data }/>
        </main>
    </>;
};

function EventItems({ data }: { data: CalendarItemType[] }) {
    if (data.length == 0) {
        return <p className="m-auto">No events for the specified date</p>
    }
    return <div className="grid md:grid-cols-2 grow gap-1 md:gap-1.5">
        { data.map(
            value =>
                <CalendarItem
                    id={ value.id }
                    title={ value.title }
                    key={ value.id }
                />
        ) }
    </div>;
}
