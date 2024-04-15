import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) { // User is available during sign-in
                token.id = user.id;
                token.householdId = user.household_id;
                token.name = `${ user.first_name } ${ user.last_name }`;
                token.initials = user.first_name[0] + user.last_name[0];
                token.email = user.email;
            }
            return token;
        },
        session({ session, token, user }) {
            session.user.id = token.id as string;
            session.user.name = token.name;
            session.user.initials = token.initials as string;
            session.user.householdId = token.householdId as string;
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
} satisfies NextAuthConfig;
