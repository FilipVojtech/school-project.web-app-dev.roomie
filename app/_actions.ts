"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { User } from "@/lib/definitions";
import { LoginFormSchema, RegisterFormSchema } from "@/lib/schema";
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
        return { success: false, error: parseResult.error.format() };
    }

    let { email, password } = parseResult.data;
    password = pepper + password;

    try {
        await signIn('credentials', { email, password, redirect: false });
        return { success: true, redirect: "/" };
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
            throw error;
        }
    }
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
