"use server";

import { z } from "zod";
import {
    ChangeEmailFormSchema,
    ChangeHouseHoldNameFormSchema,
    ChangeNameFormSchema,
    ChangePasswordFormSchema
} from "@/lib/schema";
import { sql } from "@vercel/postgres";
import { auth, signOut } from "@/auth";
import { User } from "@/lib/definitions";
import bcrypt from "bcryptjs";

const pepper = process.env.PEPPER!;

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
        session.user.name = `${ firstName } ${ lastName }`;
        session.user.initials = firstName[0] + lastName[0];
    } catch (error) {
        console.error("Couldn't change name of user", session.user.id, error);
        return { success: false, message: "There was an error changing your name" };
    }

    return { success: true, message: "Name changed successfully" };
}

export async function changeEmail(data: z.infer<typeof ChangeEmailFormSchema>) {
    const session = await auth();
    if (!session?.user) {
        return { success: false, message: "There was an error changing your email" };
    }

    const parsedData = ChangeEmailFormSchema.safeParse(data);

    if (!parsedData.success) {
        return { success: false, message: "There was an error changing your email" }
    }

    const { email } = parsedData.data;

    try {
        await sql`
            UPDATE users
            SET email=${ email }
            WHERE id = ${ session.user.id };
        `;
    } catch (error) {
        console.error("Couldn't change email of user", session.user.id, error);
        return { success: false, message: "There was an error changing your email" };
    }

    await signOut();
}

export async function changePassword(data: z.infer<typeof ChangePasswordFormSchema>) {
    const session = await auth();
    if (!session?.user) {
        return { success: false, message: "There was an error changing your password" };
    }

    const parsedData = ChangePasswordFormSchema.safeParse(data);

    if (!parsedData.success) return { success: false, message: "There was an error changing your password" };

    const { currentPassword, password, passwordRepeat } = parsedData.data;

    if (currentPassword === password) return { success: true, message: "Same password provided" };

    let user: User;

    try {
        const result = await sql<User>`
            SELECT *
            FROM users
            WHERE id = ${ session.user.id };
        `;

        user = result.rows[0];
    } catch (error) {
        console.error("Couldn't fetch user from DB.", session.user.id, error);
        return { success: false, message: "There was an error changing your password" };
    }

    const currentPasswordMatch = await bcrypt.compare(pepper + currentPassword, user.password);

    if (!currentPasswordMatch) return { success: false, message: "The current password did not match" };

    const hash = await bcrypt.hash(pepper + password, await bcrypt.genSalt())

    try {
        await sql`
            UPDATE users
            SET password=${ hash }
            WHERE id = ${ user.id };
        `;
    } catch (error) {
        console.error("Couldn't update password.");
        return { success: false, message: "There was an error changing your password" };
    }

    await signOut();
}

export async function leaveHousehold() {
    const session = await auth();

    if (!session || !session?.user) {
        return { success: false, message: "Error leaving household" }
    }

    try {
        await sql`
            UPDATE users
            SET (household_id, role) = (NULL, NULL)
            WHERE id = ${ session.user.id };
        `;

        session.user.householdId = null;
        session.user.role = null;
    } catch (error) {
        console.error("Error leaving household", session.user.id, error);
        return { success: false, message: "Error leaving household" };
    }

    return { success: true, message: "Successfully left the household.", redirect: "/" };
}

export async function changeHouseholdName(data: z.infer<typeof ChangeHouseHoldNameFormSchema>) {
    const fail = { success: false, message: "Couldn't change household name" };
    const session = await auth();

    if (!session?.user) return fail;

    const parsedData = ChangeHouseHoldNameFormSchema.safeParse(data);
    if (!parsedData.success) return fail;
    const { name } = parsedData.data;

    try {
        await sql`
            UPDATE household
            SET name=${ name }
            WHERE id = ${ session.user.householdId };
        `;
    } catch {
        console.error("Couldn't change household name", session.user.householdId);
        return fail;
    }

    return { success: true, message: "Household name changed successfully" };
}

export async function fetchHouseholdName() {
    const session = await auth();
    if (!session?.user) return null;

    try {
        const result = await sql<{ name: string }>`
            SELECT name
            FROM household
            WHERE id = ${ session.user.householdId };
        `;

        return result.rows[0].name;
    } catch {
        console.error("Couldn't change household name", session.user.householdId);
        return null;
    }
}
