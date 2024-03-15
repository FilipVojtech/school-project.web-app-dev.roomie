import { Metadata } from "next";
import Header from "@/components/Header";
import React from "react";
import NoteItem from "@/components/notes/NoteItem";

export const metadata: Metadata = {
    title: "Notes",
}

const items = [
    { id: 1, title: "Pans", text: "Non-stick pans only like plastic or wooden utensils. Otherwise they become toxic towards everyone." },
    { id: 2, title: "Dishwasher", text: "Please check that nothing is in the way of the dishwasher's blades. He is a special kid so any inconveniece will prevent him from doing his job." },
]

export default function Notes() {
    return <>
        <Header title="Notes"/>
        <main className="grid md:grid-cols-2 auto-rows-min gap-2 h-full">
        {/*<main className="flex gap-2 h-full">*/}
            { items.map(
                ({ id, title, text }) =>
                    <NoteItem key={ id } id={ id } title={ title } text={ text }/>
            ) }
        </main>
    </>;
};
