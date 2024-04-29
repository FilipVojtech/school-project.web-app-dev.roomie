"use server";

import { NoteItem } from "@/lib/definitions";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { NoteFormSchema } from "@/lib/schema";
import { revalidatePath } from "next/cache";

export async function fetchNote(id: string): Promise<NoteItem | null> {
    const returnValue: NoteItem | null = null;
    const session = await auth();

    if (!session?.user) return returnValue;

    try {
        const result = await sql<NoteItem>`
            SELECT *
            FROM notes
            WHERE id = ${ id };
        `;

        return result.rows[0];
    } catch {
        console.error("Couldn't fetch note", id);
        return returnValue;
    }
}

export async function fetchNotes(): Promise<NoteItem[]> {
    const returnValue: NoteItem[] = [];
    const session = await auth();

    if (!session?.user) return returnValue;

    try {
        const result = await sql<NoteItem>`
            SELECT *
            FROM notes
            WHERE household_id = ${ session.user.householdId }
            ORDER BY created_at DESC;
        `;

        return result.rows;
    } catch {
        console.error("Couldn't fetch notes", session.user.householdId);
        return returnValue;
    }
}

export async function createNote(data: z.infer<typeof NoteFormSchema>) {
    const session = await auth();
    const fail = { success: false, message: "Couldn't create note" };

    if (!session?.user) return fail;

    const parsedData = NoteFormSchema.safeParse(data);

    if (!parsedData.success) return fail;

    const { title, content } = parsedData.data;

    try {
        await sql`
            INSERT INTO notes(title, content, author_id, household_id)
            VALUES (${ title }, ${ content }, ${ session.user.id }, ${ session.user.householdId });
        `;
    } catch {
        console.error("Couldn't create note", session.user.id, session.user.householdId);
        return fail;
    }

    revalidatePath("/notes");
    return { success: true, message: "Note created", redirectTo: "/notes" };
}

export async function updateNote(id: string, data: z.infer<typeof NoteFormSchema>) {
    const session = await auth();
    const fail = { success: false, message: "Couldn't update note" };

    if (!session?.user) return fail;

    const parsedData = NoteFormSchema.safeParse(data);

    if (!parsedData.success) return fail;

    const { title, content } = parsedData.data;

    try {
        await sql`
            UPDATE notes
            SET title=${ title },
                content=${ content }
            WHERE id = ${ id };
        `;
    } catch {
        console.error("Couldn't update note", id);
        return fail;
    }

    revalidatePath("/notes");
    return { success: true, message: "Note updated", redirectTo: "/notes" };
}

export async function deleteNote(id: string) {
    const session = await auth();
    const fail = { success: false, message: "Couldn't delete note" };

    if (!session?.user) return fail;

    try {
        await sql`
            DELETE FROM notes
            WHERE id = ${ id };
        `;
    } catch {
        console.error("Couldn't delete note", id);
        return fail;
    }

    revalidatePath("/notes");
    return { success: true, message: "Note deleted", redirectTo: "/notes" };
}
