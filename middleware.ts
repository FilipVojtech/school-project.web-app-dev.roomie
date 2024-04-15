import { auth } from "./auth";

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|.*\\.png$).*)',
    ],
};

export default auth(({ auth, nextUrl }): void | Response | Promise<void | Response> => {
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
        if (isLoggedIn) {
            return;
        } else {
            return Response.redirect(new URL("/login", nextUrl));
        }
    }
    // Root page handler
    if (nextUrl.pathname === '/') {
        if (!isLoggedIn) {
            return Response.redirect(new URL("/login", nextUrl));
        } else if (auth.user?.householdId == null) {
            return Response.redirect(new URL('/create-household', nextUrl));
        } else {
            return Response.redirect(new URL('/fridge', nextUrl));
        }
    }
    if (nextUrl.pathname.startsWith("/create-household")) {
        if (!isLoggedIn) {
            return
        } else if (auth?.user?.householdId == null) {
            return;
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
    return;
})
