"use server";

import { auth } from "@/auth";
import type { User } from "@/lib/definitions"
import { createClient, sql } from "@vercel/postgres";
import { z } from "zod";
import { InviteUserFormSchema } from "@/lib/schema";

export async function fetchHouseholdMembers() {
    const session = await auth();
    if (!session?.user) return null;

    try {
        const result = await sql<User>`
            SELECT *
            FROM users
            WHERE household_id = ${ session.user.householdId };
        `;

        return result.rows;
    } catch {
        console.error("Couldn't fetch users", session.user.householdId);
        return null;
    }
}

export async function sendInvite(data: z.infer<typeof InviteUserFormSchema>) {
    const fail = { success: false, message: "Couldn't send invite" };
    const session = await auth();
    if (!session?.user) return fail;

    if (session.user.role != "admin") return { success: false, message: "You're not allowed to invite users" }

    const parsedData = InviteUserFormSchema.safeParse(data);
    if (!parsedData.success) return fail;

    const { firstName, lastName, email } = parsedData.data;

    const client = createClient()
    await client.connect();
    try {
        const result = await client.sql`
            INSERT INTO users(household_id, first_name, last_name, email, role)
            VALUES (${ session.user.householdId }, ${ firstName }, ${ lastName }, ${email}, 'invited');
        `;
    } catch {
        console.error("Couldn't send invite", session.user.id, session.user.householdId);
        return fail;
    } finally {
        await client.end();
    }

    return { success: true, message: "User invited" };

}
