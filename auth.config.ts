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
        authorized({ auth, request: { nextUrl } }) {
            const restrictedPages = [ "/fridge", "/notes", "/calendar", "/account", "/household", "/create-household" ];
            const isLoggedIn = !!auth?.user;
            const isOnRestrictedPage = ((): boolean => {
                for (const restrictedPage of restrictedPages) {
                    if (nextUrl.pathname.startsWith(restrictedPage)) return true;
                }
                return false;
            })()

            if (isOnRestrictedPage) {
                if (auth?.user?.householdId == null && !nextUrl.pathname.startsWith("/create-household")) {
                    return Response.redirect(new URL("/create-household", nextUrl));
                }
                // True - Continue
                // False - Redirect unauthenticated users to login page
                return isLoggedIn;
            }
            // Root page handler
            if (nextUrl.pathname === '/') {
                if (!isLoggedIn) {
                    return false;
                } else if (auth.user?.householdId == null) {
                    return Response.redirect(new URL('/create-household', nextUrl));
                } else {
                    return Response.redirect(new URL('/fridge', nextUrl));
                }
            }
            if (nextUrl.pathname.startsWith("/create-household")) {
                if (!isLoggedIn) {
                    return false;
                } else if (auth?.user?.householdId == null) {
                    return true
                } else {
                    return Response.redirect(new URL("/fridge", nextUrl));
                }
            }
            if (
                isLoggedIn && (
                    nextUrl.pathname.startsWith('/login') ||
                    nextUrl.pathname.startsWith('/register')
                )
            ) {
                return Response.redirect(new URL('/', nextUrl));
            }
            return true;
        },
    },
    providers: [],
});
