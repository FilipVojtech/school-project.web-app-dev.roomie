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
            const restrictedPages = [ "/fridge", "/notes", "/calendar", "/account" ];
            const isLoggedIn = !!auth?.user;
            let isOnRestrictedPage = true;

            checkIfUserNotOnRestrictedPage:
            {
                for (const restrictedPage of restrictedPages) {
                    if (nextUrl.pathname.startsWith(`/${ restrictedPage }`)) {
                        // User is on restricted page, do not change default value
                        break checkIfUserNotOnRestrictedPage;
                    }
                }
                isOnRestrictedPage = false;
            }

            if (isOnRestrictedPage) {
                return isLoggedIn;
                // True - Continue
                // False - Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [],
} satisfies NextAuthConfig;
