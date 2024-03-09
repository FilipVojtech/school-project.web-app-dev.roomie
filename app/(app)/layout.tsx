"use client";

import Header from "@/app/(app)/Header";
import Navigation from "@/app/(app)/Navigation";
import React, { useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [ pageTitle, changeTitle ] = useState("Roomie app");

    return <div className="flex flex-col h-full md:flex-row">
        <div id="content" className="flex flex-col h-full lg:w-1/2 lg:m-auto">
            { children }
        </div>
        <Navigation/>
    </div>;
}
