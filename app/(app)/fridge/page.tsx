import { Metadata } from "next";
import Header from "@/components/Header";
import React from "react";
import FridgeItem from "@/components/fridge/FridgeItem";

export const metadata: Metadata = {
    title: "Fridge",
}

const items = [
    {
        id: 1, name: "Oat Milk", bestBefore: new Date(2024, 5), owners: [
            { firstName: "Filip", lastName: "Vojtěch" },
            { firstName: "Sylluar", lastName: "Eilwraek" },
        ]
    },
    {
        id: 2, name: "Oat Milk", bestBefore: new Date(2024, 5), owners: [
            { firstName: "Filip", lastName: "Vojtěch" }
        ]
    },
    {
        id: 3, name: "Frankfurters", bestBefore: new Date(2024, 5), owners: [
            { firstName: "Filip", lastName: "Vojtěch" },
            { firstName: "Sylluar", lastName: "Eilwraek" },
            { firstName: "Sylluar", lastName: "Eilwraek" },
        ]
    }
]

export default function Fridge() {
    return <>
        <Header title="Fridge"/>
        <main className="grid md:grid-cols-2 auto-rows-min gap-2 h-full">
            { items.map(({ id, name, bestBefore, owners }) => {
                return <FridgeItem
                    key={ id }
                    id={ id.toString() }
                    name={ name }
                    bestBefore={ bestBefore }
                    owners={ owners }
                />;
            }) }
        </main>
    </>;
}
