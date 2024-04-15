import NextAuth, { type User as AuthUser } from 'next-auth';
import type { SessionUser, User } from "@/lib/definitions";

export const authConfig = NextAuth({
    pages: {
        signIn: '/login',
    },
    callbacks: {
        jwt({ token, user }) {
            const { household_id, first_name, last_name } = user as AuthUser & User
            if (user) { // User is available during sign-in
                token.id = user.id;
                token.householdId = household_id;
                token.name = `${ first_name } ${ last_name }`;
                token.initials = first_name[0] + last_name[0];
                token.email = user.email;
            }
            return token;
        },
        session({ session, token }) {
            const { id, name, initials, householdId } = token as SessionUser;

            session.user.id = id;
            session.user.name = name;
            session.user.initials = initials;
            session.user.householdId = householdId;
            return session;
        },
    },
    providers: [],
});
