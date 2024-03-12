import React from "react";
import {
    Refrigerator,
    Sticker,
    Calendar,
    CircleUser
} from 'lucide-react';
import NavItem from "@/app/(app)/NavItem";

export default function Navigation() {
    // TODO: Remove when authentication implemented
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
