"use client";

import React from "react";
import { XSquare } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { clsx } from "clsx";

export default function NavItem(
    {
        href,
        icon = <XSquare/>,
        display = true,
        children
    }: {
        href: string,
        icon?: React.JSX.Element | null
        display?: boolean,
        children: React.ReactNode
    }) {
    const pathName = usePathname();

    if (display) {
        return <>
            <Link
                className={ clsx(
                    "flex flex-auto basis-1/3 flex-col items-center bg-[#b9f2ba] p-2 rounded-md md:flex-row md:gap-3 md:text-lg md:flex-[0_0_auto] md:p-3",
                    {
                        "text-blue-600 font-medium": pathName == href,
                    }
                ) }
                href={ href }
            >
                { icon }
                { children }
            </Link>
        </>;
    } else return null;
}
