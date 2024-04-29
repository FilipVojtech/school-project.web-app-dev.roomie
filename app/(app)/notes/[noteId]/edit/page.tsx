import Header from "@/components/Header";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import EditNoteForm from "@/components/notes/EditNoteForm";
import { fetchNote } from "@/app/(app)/notes/_actions";

export const metadata: Metadata = {
    title: "Edit note",
}

export default async function EditFridgeItemPage({ params }: { params: { noteId: string } }) {
    const note = await fetchNote(params.noteId);

    if (note == null) notFound();

    return <>
        <Header title="Edit note"/>
        <main>
            <EditNoteForm note={ note }/>
        </main>
    </>
};
