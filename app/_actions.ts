"use server";

import { auth, signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { User } from "@/lib/definitions";
import {
    CreateHouseholdFormSchema,
    LoginFormSchema,
    RegisterFormSchema
} from "@/lib/schema";
import bcrypt from "bcryptjs";

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

    // Check user does not exist
    let user;
    try {
        user = await sql<User>`
            SELECT *
            FROM users
            WHERE email = ${ email };
        `;
    } catch (error) {
        console.error("SQL Error while creating user", error);
    }
    if (user && user.rowCount > 0) {
        return {
            success: false,
            message: "User with that email address already exists.",
        }
    }

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(pepper + password, salt);

    try {
        if (!!birthDate) {
            await sql`
                INSERT INTO users (first_name, last_name, email, password, birth_date)
                values (${ firstName }, ${ lastName }, ${ email }, ${ password }, ${ birthDate.toDateString() });
            `;
        } else {
            await sql`
                INSERT INTO users (first_name, last_name, email, password)
                values (${ firstName }, ${ lastName }, ${ email }, ${ password });
            `;
        }
    } catch (error) {
        console.error("Error creating user", error);
        throw new Error("Failed to register");
    }

    return {
        success: true,
        redirect: '/login',
        message: "Account created successfully, you can now log&nbsp;in."
    };
}

export async function createHousehold(data: z.infer<typeof CreateHouseholdFormSchema>) {
    const session = await auth();
    if (!session?.user) {
        return { success: false, message: "There was an issue creating the household" };
    }

    const parseResult = CreateHouseholdFormSchema.safeParse(data);

    if (!parseResult.success) {
        return { success: false, error: parseResult.error.format() };
    }

    const { householdName } = parseResult.data;

    try {
        const createHouseholdResult = await sql`
            INSERT INTO household(name)
            VALUES (${ householdName })
            RETURNING id;
        `;
        const newHouseholdId = createHouseholdResult.rows[0].id;

        await sql`
            UPDATE users
            SET household_id=${ newHouseholdId }
            WHERE id = ${ session.user.id };
        `;

        session.user.householdId = householdName;
    } catch (error) {
        console.error("Error creating household.", error);
        return { success: false, message: "There was an issue creating the household", }
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
    }

    return {
        success: true,
        message: "Your account was deleted successfully. Thank you for being with us.",
        redirect: "/",
    };
}
