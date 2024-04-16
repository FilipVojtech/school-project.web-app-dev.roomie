import NextAuth from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { fetchUser } from "@/app/_actions";
import type { SessionUser, User } from "@/lib/definitions";


export const { handlers, auth, signIn, signOut } = NextAuth({
    pages: {
        signIn: '/login',
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                const { id, email, household_id, first_name, last_name } = user as User;
                token.id = id;
                token.householdId = household_id;
                token.name = `${ first_name } ${ last_name }`;
                token.initials = first_name[0] + last_name[0];
                token.email = email;
            }
            return token;
        },
        async session({ session, token }) {
            const { id, email, name, initials, householdId } = token as SessionUser;

            session.user.id = id;
            session.user.name = name;
            session.user.initials = initials;
            session.user.householdId = householdId;

            const user = await fetchUser(email);

            if (user?.household_id) {
                session.user.householdId = user.household_id;
            }

            return session;
        },

    },
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
