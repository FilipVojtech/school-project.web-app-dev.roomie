import { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
    title: {
        template: "%s | Roomie",
        default: "Roomie",
    }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <html lang="en">
    <body className="p-[5px] md:p-[10px] min-h-dvh">
    <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
    >
        { children }
        <Toaster richColors/>
    </ThemeProvider>
    </body>
    </html>;
}
