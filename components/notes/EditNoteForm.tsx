"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NoteFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createNote, deleteNote, updateNote } from "@/app/(app)/notes/_actions";
import { toast } from "sonner";
import { NoteItem } from "@/lib/definitions";
import { Trash } from "lucide-react";
import React from "react";

export default function EditNoteForm({ note }: { note: NoteItem }) {
    const router = useRouter();
    const form = useForm<z.infer<typeof NoteFormSchema>>({
        resolver: zodResolver(NoteFormSchema),
        defaultValues: {
            title: note.title,
            content: note.content,
        }
    })

    async function onSubmit(values: z.infer<typeof NoteFormSchema>) {
        const result = await updateNote(note.id, values);

        if (result.success) toast.success(result.message);
        else toast.error(result.message);
        // @ts-ignore
        if (result?.redirectTo) router.replace(result.redirectTo!);
    }

    async function handleDelete() {
        const result = await deleteNote(note.id);

        if (result.success) toast.success(result.message);
        else toast.error(result.message);
        // @ts-ignore
        if (result?.redirectTo) router.replace(result.redirectTo);
    }

    return <>
        <Form { ...form }>
            <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-5">
                <FormField
                    control={ form.control }
                    name="title"
                    render={ ({ field }) => (
                        <FormItem>
                            <FormLabel>Title (optional)</FormLabel>
                            <FormControl>
                                <Input { ...field }/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    ) }
                />
                <FormField
                    control={ form.control }
                    name="content"
                    render={ ({ field }) => (
                        <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                                <AutosizeTextarea  { ...field }/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    ) }
                />
                <Button type="submit" className="w-full">Save note</Button>
                <div className="flex gap-5">
                    <Button variant="destructive" type="button" onClick={ handleDelete }>
                        <Trash/>
                    </Button>
                    <Button type="button" variant="secondary" className="w-full" asChild>
                        <Link href="/notes">Cancel</Link>
                    </Button>
                </div>
            </form>
        </Form>
    </>;
};
