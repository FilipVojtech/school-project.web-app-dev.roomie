"use client";
import React from "react";
import UserImage from "@/components/UserImage";
import Link from "next/link";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header({ title, disableAccount = false, className }: {
    title: string,
    disableAccount?: boolean
    className?: string | undefined,
}) {
    const pathName = usePathname();

    return <header
        className={ cn("flex flex-row justify-between items-center mb-[5px] md:mb-[10px] select-none", className) }
    >
        <span className="text-3xl mb-[5px] md:mb-[10px]">{ title }</span>
        <Link
            href="/account"
            className={ clsx(
                "md:hidden contents",
                {
                    "text-blue-500": pathName == "/account"
                }
            ) }
        >
            { !disableAccount && <UserImage/> }
        </Link>
    </header>;
};
