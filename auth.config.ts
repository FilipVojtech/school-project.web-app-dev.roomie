import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
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
