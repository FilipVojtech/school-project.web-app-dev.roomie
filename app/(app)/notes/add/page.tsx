import Header from "@/components/Header";
import AddNoteForm from "@/components/notes/AddNoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Add note",
}

export default function AddNotePage() {
    return <>
        <Header title="Add note"/>
        <main>
            <AddNoteForm/>
        </main>
    </>

};
