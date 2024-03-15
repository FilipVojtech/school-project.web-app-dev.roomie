import React from "react";
import {
    Refrigerator,
    Sticker,
    Calendar,
    CircleUser
} from 'lucide-react';
import NavItem from "@/components/NavItem";
import Image from "next/image";

export default function Navigation() {
    // TODO: Remove when authentication implemented
    let username = "Test Debuger"

    return <nav
        className="flex align-middle justify-between gap-2 mt-[5px] md:-order-1 md:mr-[10px] md:mt-0 md:flex-col md:gap-2 md:justify-start"
    >
        <div className="hidden md:contents">
            <NavItem href="/fridge" icon={ null }>
                <Image className="pt-12 pr-10" src="/Logo.png" alt="" width={225} height={0}/>
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
