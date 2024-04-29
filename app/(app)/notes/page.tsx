import { Metadata } from "next";
import Header from "@/components/Header";
import React from "react";
import NoteItem from "@/components/notes/NoteItem";
import type { NoteItem as NoteItemType } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { fetchNotes } from "@/app/(app)/notes/_actions";

export const metadata: Metadata = {
    title: "Notes",
}

export default async function Notes() {
    // [
    //     {
    //         id: "1",
    //         author_id: "1",
    //         created_at: new Date(),
    //         pinned: false,
    //         title: "Pans",
    //         content: "Non-stick pans only like plastic or wooden utensils. Otherwise they become toxic towards everyone."
    //     },
    //     {
    //         id: "2",
    //         author_id: "1",
    //         created_at: new Date(),
    //         pinned: false,
    //         title: "Dishwasher",
    //         content: "Please check that nothing is in the way of the dishwasher's blades. He is a special kid so any inconveniece will prevent him from doing his job."
    //     },
    // ]
    let notes = await fetchNotes();

    return <>
        <Header title="Notes"/>
        <main className="">
            <Button asChild className="mb-2">
                <Link href="/notes/add">
                    <Plus className="mr-2 h-4 w-4"/>Create note
                </Link>
            </Button>
            <div className="grid md:grid-cols-2 auto-rows-min gap-2 h-full">
                <NoteItems notes={ notes }/>
            </div>
        </main>
    </>;
};

function NoteItems({ notes }: { notes: NoteItemType[] }) {
    if (notes.length > 0) {
        return <>
            { notes.map((value) => <NoteItem key={ value.id } { ...value }/>) }
        </>;
    } else {
        return <>
            <p>No notes have been added yet.</p>
        </>;
    }
}
