"use server";

import { z } from "zod";
import { ChangeNameFormSchema } from "@/lib/schema";
import { sql } from "@vercel/postgres";
import { auth } from "@/auth";

export async function changeName(data: z.infer<typeof ChangeNameFormSchema>) {
    const session = await auth();
    if (!session?.user) {
        return { success: false, message: "There was an error changing your name" };
    }

    const parsedData = ChangeNameFormSchema.safeParse(data);

    if (!parsedData.success) {
        return { success: false, message: "There was an error changing your name" };
    }

    const { firstName, lastName } = parsedData.data;

    try {
        await sql`
            UPDATE users
            SET (first_name, last_name) = (${ firstName }, ${ lastName })
            WHERE id = ${ session.user.id };
        `;

        session.user.firstName = firstName;
        session.user.lastName = lastName;
    } catch (error) {
        console.error("Couldn't change name of user", session.user.id, error);
    }

    return { success: true, message: "Name change successfully" };
}
