import { Metadata } from "next";
import Header from "@/components/Header";
import React from "react";
import FridgeItem from "@/components/fridge/FridgeItem";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { FridgeItem as FridgeItemType } from '@/lib/definitions'
import { fetchUserFridgeItems } from "@/app/(app)/fridge/_actions";

export const metadata: Metadata = {
    title: "Fridge",
}

export default async function Fridge() {
    const items: FridgeItemType[] = await fetchUserFridgeItems();

    return <>
        <Header title="Fridge"/>
        <main>
            <Button asChild className="mb-2">
                <Link href="/fridge/add">
                    <Plus className="mr-2 h-4 w-4"/>Add item
                </Link>
            </Button>
            <div className="grid md:grid-cols-2 auto-rows-min gap-2 h-full">
                <FridgeItems items={ items }/>
            </div>
        </main>
    </>;
}

function FridgeItems({ items }: { items: FridgeItemType[] }) {
    if (items.length > 0) {
        return <>
            { items.map(({ id, name, expiry_date, owners, quantity }) => {
                return <FridgeItem
                    key={ id }
                    id={ id.toString() }
                    name={ name }
                    bestBefore={ expiry_date }
                    quantity={ quantity }
                    // owners={ owners }
                    owners={ [] }
                />;
            }) }
        </>;
    } else {
        return <>
            <p className="text-xl">You don&apos;t have any items in the fridge.</p>
        </>;
    }
}
