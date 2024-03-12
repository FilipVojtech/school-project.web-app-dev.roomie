import React from "react";
import Link from "next/link";
import Image from "next/image";
import { XSquare, Refrigerator, Sticker, Calendar, CircleUser } from 'lucide-react';
import { clsx } from "clsx";
import { usePathname } from "next/navigation";

export default function Navigation() {
    let username = "Test Debuger"

    return <nav
        className="flex align-middle justify-between gap-2 mt-[5px] md:-order-1 md:mr-[10px] md:mt-0 md:flex-col md:gap-2 md:justify-start"
    >
        <div className="hidden md:contents">
            <NavItem href="/fridge" icon={ null }>
                {/*<Image src="Logo.png" alt=""/>*/ }
                <span className="text-3xl pt-12 pr-14 text-foreground font-semibold">Roomie</span>
            </NavItem>
        </div>
        <NavItem href="/fridge" icon={ <Refrigerator/> }>Fridge</NavItem>
        <NavItem href="/notes" icon={ <Sticker/> }>Notes</NavItem>
        <NavItem href="/calendar" icon={ <Calendar/> }>Calendar</NavItem>
        <div className="bg-[#b9f2ba] hidden h-auto w-full grow rounded-md md:block"></div>
        <div className="hidden md:contents">
            <NavItem href="/account" icon={ <CircleUser/> }>{ username }</NavItem>
        </div>
    </nav>
}

function NavItem(
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
