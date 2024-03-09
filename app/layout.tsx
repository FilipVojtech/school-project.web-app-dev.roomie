import { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import React from "react";

export const metadata: Metadata = {
    title: {
        template: "%s | Roomie",
        default: "Roomie",
    }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <html lang="en">
    <body className="p-[5px] md:p-[10px] h-dvh">
    <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
    >
        { children }
    </ThemeProvider>
    </body>
    </html>;
}
