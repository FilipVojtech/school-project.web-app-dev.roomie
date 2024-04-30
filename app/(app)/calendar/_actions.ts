"use server";

import { CalendarItem } from "@/lib/definitions";
import { z } from "zod";
import { EventFormSchema } from "@/lib/schema";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { formatISO } from "date-fns";
import { revalidatePath } from "next/cache";

export async function getFrequencyOptions(): Promise<{ value: string, label: string }[]> {
    return [
        { value: "1wk", label: "Weekly" },
        { value: "2wk", label: "Fortnightly" },
        { value: "1m", label: "Monthly" },
        { value: "1yr", label: "Yearly" },
    ]

}

export async function fetchEvents(date: Date): Promise<CalendarItem[]> {
    const session = await auth();
    let events: CalendarItem[] = [];
    if (!session?.user) return events;

    try {
        const result = await sql<CalendarItem>`
            SELECT *
            FROM events
            WHERE household_id = ${ session.user.householdId }
              AND starts_on = ${ formatISO(date, { representation: "date" }) };
        `;

        events = result.rows;
    } catch {
        console.error("Couldn't fetch events.", session.user.householdId);
        return events;
    }

    return events;
}

export async function fetchEvent(id: string): Promise<CalendarItem | null> {
    const session = await auth();
    if (!session?.user) return null;

    try {
        const result = await sql<CalendarItem>`
            SELECT id, title, author_id, household_id, repeating, frequency, starts_on
            FROM events
            WHERE id = ${ id };
        `;

        return result.rows[0];
    } catch {
        console.error("Couldn't fetch event", id);
        return null;
    }
}

export async function createEvent(data: z.infer<typeof EventFormSchema>) {
    const fail = { success: false, message: "Couldn't create event" };
    const session = await auth();
    if (!session?.user) return fail;

    const parsedData = EventFormSchema.safeParse(data);
    if (!parsedData.success) return fail;

    const { title, date, repeating, frequency } = parsedData.data;

    try {
        sql`
            INSERT INTO events(title, author_id, household_id, repeating, frequency, starts_on)
            VALUES (${ title }, ${ session.user.id }, ${ session.user.householdId }, ${ repeating }, ${ frequency },
                    ${ formatISO(date) });
        `;
    } catch {
        console.error("Couldn't add event", session.user.id);
        return fail;
    }

    const returnTo = `/calendar/${ formatISO(date, { representation: "date" }) }`;

    revalidatePath(returnTo);
    return { success: true, message: "Event created", redirectTo: returnTo };
}

export async function updateEvent(id: string, data: z.infer<typeof EventFormSchema>) {
    const session = await auth();
    const fail = { success: false, message: "Couldn't update event" };
    if (!session?.user) return fail;

    const parsedData = EventFormSchema.safeParse(data);
    if (!parsedData.success) return fail;

    const { title, date, repeating, frequency } = parsedData.data;

    try {
        const result = await sql<{ starts_on: Date }>`
            UPDATE events
            SET title=${ title },
                starts_on=${ formatISO(date) },
                repeating=${ repeating },
                frequency=${ frequency }
            WHERE id = ${ id }
            RETURNING starts_on;
        `;

        const oldDate = result.rows[0].starts_on;
        const returnTo = `/calendar/${ formatISO(date, { representation: "date" }) }`;
        revalidatePath(`/calendar/${ formatISO(oldDate, { representation: "date" }) }`);
        revalidatePath(returnTo);
        return { success: true, message: "Event updated", redirectTo: returnTo };
    } catch {
        console.error("Couldn't update event", id);
        return fail;
    }
}

export async function deleteEvent(id: string) {
    const session = await auth();
    const fail = { success: false, message: "Couldn't delete event" };

    if (!session?.user) return fail;

    try {
        const result = await sql<{ starts_on: Date }>`
            DELETE
            FROM events
            WHERE id = ${ id }
            RETURNING starts_on;
        `;

        const date = result.rows[0].starts_on;
        const returnTo = `/calendar/${ formatISO(date, { representation: "date" }) }`;

        revalidatePath(returnTo);
        return { success: true, message: "Event deleted", redirectTo: returnTo };
    } catch {
        console.error("Couldn't delete event", id);
        return fail;
    }
}
