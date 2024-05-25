import React from "react";
import {
    Refrigerator,
    Sticker,
    Calendar,
    CircleUser
} from 'lucide-react';
import NavItem from "@/components/NavItem";
import Image from "next/image";
import { auth } from "@/auth";

export default async function Navigation() {
    const session = await auth();
    if (!session?.user) return <p>Error occurred</p>
    const username = `${session.user.firstName} ${session.user.lastName}`;

    return <nav
        className="flex justify-between gap-2 align-middle mt-[5px] md:mr-[10px] md:top-2.5 bottom-[5px] md:bottom-[unset] z-40 sticky md:-order-1 md:mt-0 md:h-[calc(100dvh-20px)] md:flex-col md:justify-start md:gap-2"
    >
        <div className="hidden md:contents">
            <NavItem href="/fridge" icon={ null }>
                <Image className="pt-12 pr-10" src="/Logo.png" alt="" width={ 225 } height={ 0 } priority/>
            </NavItem>
        </div>
        <NavItem href="/fridge" icon={ <Refrigerator/> }>Fridge</NavItem>
        <NavItem href="/notes" icon={ <Sticker/> }>Notes</NavItem>
        <NavItem href="/calendar" icon={ <Calendar/> }>Calendar</NavItem>
        {/*Spacer*/ }
        <div className="hidden bg-[#b9f2ba] w-full rounded-md md:block md:flex-grow"></div>
        <div className="hidden md:contents">
            <NavItem href="/account" icon={ <CircleUser/> }>{ username }</NavItem>
        </div>
    </nav>
}
