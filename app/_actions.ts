"use server";

import { auth, signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { createClient, sql } from "@vercel/postgres";
import { z } from "zod";
import { User } from "@/lib/definitions";
import {
    CreateHouseholdFormSchema,
    LoginFormSchema,
    RegisterFormSchema
} from "@/lib/schema";
import bcrypt from "bcryptjs";
import CreateHouseholdForm from "@/app/(landing)/create-household/CreateHouseholdForm";

const pepper = process.env.PEPPER!;

export async function fetchUser(email: string): Promise<User | undefined> {
    try {
        const user = await sql<User>`
            SELECT *
            FROM users
            WHERE email = ${ email }
        `;
        return user.rows[0];
    } catch (error) {
        throw new Error("Failed to fetch user");
    }
}

export async function authenticate(data: z.infer<typeof LoginFormSchema>) {
    const parseResult = LoginFormSchema.safeParse(data);

    if (!parseResult.success) {
        return { success: false, message: "Something went wrong" };
    }

    let { email, password } = parseResult.data;
    password = pepper + password;

    try {
        await signIn('credentials', { email, password, redirect: false });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { success: false, message: "Invalid Credentials" };
                default: {
                    console.error("Sign in error", error);
                    return { success: false, message: "Something went wrong" };
                }
            }
        } else {
            console.error("Non AuthError occurred");
            return { success: false, message: "Something went wrong" };
        }
    }
    return { success: true, redirect: "/" };
}

export async function register(data: z.infer<typeof RegisterFormSchema>) {
    const parseResult = RegisterFormSchema.safeParse(data);

    if (!parseResult.success) {
        return { success: false, error: parseResult.error.format() };
    }

    let { email, password, firstName, lastName, birthDate, } = parseResult.data;

    const client = createClient();
    await client.connect();
    // Check user does not exist
    let user;
    try {
        user = await client.sql<User>`
            SELECT *
            FROM users
            WHERE email = ${ email };
        `;
    } catch (error) {
        console.error("SQL Error while creating user", error);
        await client.end();
        return { success: false, message: "Failed to register" };
    }

    if (user && user.rowCount > 0) {
        const existingUser = user.rows[0];
        if (!(existingUser.first_name == firstName && existingUser.last_name == lastName && existingUser.email == email)) {
            return {
                success: false,
                message: "User with that email address already exists.",
            };
        }
    }

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(pepper + password, salt);

    try {
        if (!!birthDate) {
            await client.sql`
                INSERT INTO users (first_name, last_name, email, password, birth_date)
                VALUES (${ firstName }, ${ lastName }, ${ email }, ${ password }, ${ birthDate.toDateString() });
            `;
        } else {
            await client.sql`
                INSERT INTO users (first_name, last_name, email, password)
                VALUES (${ firstName }, ${ lastName }, ${ email }, ${ password });
            `;
        }
    } catch (error) {
        console.error("Error creating user", error);
        throw new Error("Failed to register");
    } finally {
        await client.end();
    }

    return {
        success: true,
        redirect: '/login',
        message: "Account created successfully, you can now log&nbsp;in."
    };
}

export async function createHousehold(data: z.infer<typeof CreateHouseholdFormSchema>): Promise<
    { success: boolean, message?: string, error?: any, redirect?: string }
> {
    const fail = { success: false, message: "There was an issue creating the household" };
    const session = await auth();
    if (!session?.user) {
        return fail;
    }

    const parseResult = CreateHouseholdFormSchema.safeParse(data);

    if (!parseResult.success) return { ...fail, error: parseResult.error.format() };

    const { householdName } = parseResult.data;

    const client = createClient();
    await client.connect();
    try {
        const createHouseholdResult = await client.sql`
            INSERT INTO household(name)
            VALUES (${ householdName })
            RETURNING id;
        `;
        const newHouseholdId = createHouseholdResult.rows[0].id;

        await client.sql`
            UPDATE users
            SET household_id=${ newHouseholdId },
                role='admin'
            WHERE id = ${ session.user.id };
        `;

        session.user.householdId = newHouseholdId;
        session.user.role = "admin";
    } catch (error) {
        console.error("Error creating household.", error);
        return fail;
    } finally {
        await client.end();
    }

    return { success: true, redirect: "/fridge", }
}

export async function deleteAccount() {
    // TODO: Proper account deletion
    const session = await auth();
    const failResult = { success: false, message: "There was an issue deleting your account." };

    if (!session?.user) {
        return failResult;
    }

    try {
        await sql`
            DELETE
            FROM users
            WHERE id = ${ session?.user.id };
        `;
        console.log("DELETED");
    } catch (error) {
        console.error("Failed deleting account", session.user.id, error);
        return failResult;
    }

    await signOut();
}
