import React from "react";
import Navigation from "@/app/(app)/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col h-full md:flex-row">
        <div id="content" className="flex flex-col h-full w-full rounded-md lg:w-1/2 lg:m-auto">
            { children }
        </div>
        <Navigation/>
    </div>;
}
