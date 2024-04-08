import React from "react";
import Navigation from "@/components/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="flex flex-col min-h-[calc(100dvh-10px)] md:min-h-[calc(100dvh-20px)] md:flex-row">
        <div id="content" className="flex flex-col grow md:grow-0 w-full rounded-md lg:w-8/12 lg:mx-auto">
            { children }
        </div>
        <Navigation/>
    </div>;
}
