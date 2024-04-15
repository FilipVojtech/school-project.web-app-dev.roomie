import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { fetchUser } from "@/app/_actions";


export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [ Credentials({
        async authorize(credentials) {
            const { email, password } = credentials as { email: string, password: string };
            const user = await fetchUser(email);
            if (!user) return null;
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) return user;
            return null;
        },
    }) ]
});
