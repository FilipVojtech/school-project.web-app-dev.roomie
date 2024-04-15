"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import { User } from "@/lib/definitions";
import { LoginFormSchema } from "@/lib/schema";
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
        await signIn('credentials', { email, password, redirectTo: "/" });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid Credentials";
                default: {
                    console.error("Sign in error", error);
                    return "Something went wrong";
                }
            }
        } else {
            console.error("Non AuthError occurred");
            throw error;
        }
    }
}
    }

}
