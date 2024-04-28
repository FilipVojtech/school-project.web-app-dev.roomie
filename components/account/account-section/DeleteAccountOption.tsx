"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import SettingsItem from "@/components/account/SettingsItem";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { deleteAccount } from "@/app/_actions";


export default function DeleteAccountOption() {
    async function handleDelete() {
        const result = await deleteAccount();

        if (!!result) {
            toast.error(result.message);
        }
    }

    return <>
        <AlertDialog>
            <AlertDialogTrigger>
                <SettingsItem title="Delete account" icon={ <Trash2/> } destructive/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>This action cannot be undone. You will have to create a new account.</p> <br/>
                        <p className="font-semibold">If you wish to create your own household, consider just leaving this one.</p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button variant="destructive" onClick={ handleDelete }>Permanently delete my account</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>;
}
