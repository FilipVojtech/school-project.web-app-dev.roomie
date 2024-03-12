"use client";
import React from "react";
import UserImage from "@/app/(app)/UserImage";
import Link from "next/link";
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

export default function Header({ title }: { title: string }) {
    const pathName = usePathname();

    return <header className="flex flex-row justify-between items-center mb-[5px] md:mb-[10px]">
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
            <UserImage/>
        </Link>
    </header>;
};
