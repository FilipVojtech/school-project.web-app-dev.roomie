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
                const { id, email, household_id, first_name, last_name, role } = user as User;

                token.id = id;
                token.householdId = household_id;
                token.firstName = first_name;
                token.lastName = last_name;
                token.name = `${ first_name } ${ last_name }`;
                token.initials = first_name[0] + last_name[0];
                token.email = email;
                token.role = role;
            }
            return token;
        },
        async session({ session, token }) {
            const {
                id,
                email,
                firstName,
                lastName,
                name,
                initials,
                householdId,
                role,
            } = token as SessionUser;

            session.user.id = id;
            session.user.firstName = firstName;
            session.user.lastName = lastName;
            session.user.name = name;
            session.user.initials = initials;
            session.user.householdId = householdId;
            session.user.role = role;

            const user = await fetchUser(session.user.email ?? email);

            if (!!user) {
                session.user.householdId = user.household_id;
                session.user.email = user.email;
                session.user.firstName = user.first_name;
                session.user.lastName = user.last_name;
                session.user.name = `${ user.first_name } ${ user.last_name }`;
                session.user.initials = user.first_name[0] + user.last_name[0];
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
