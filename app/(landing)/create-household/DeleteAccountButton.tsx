"use client";

import { deleteAccount } from "@/app/_actions";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { signOut } from "next-auth/react"

export default function DeleteAccountButton() {
    async function onDeleteAccountClick() {
        const result = await deleteAccount();

        if (!result) return;
        if (result.success) {
            toast.success(result.message);
            await signOut();
        } else {
            toast.error(result.message);
        }
    }

    return <AlertDialog>
        <AlertDialogTrigger className="w-full" asChild>
            <Button
                variant="link"
                className="text-destructive no-underline"
            >
                Delete my account
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                Are you sure?
            </AlertDialogHeader>
            <AlertDialogDescription>
                This action cannot be undone. <br/>
                When you receive an invitation you will have to create an account.
            </AlertDialogDescription>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={ onDeleteAccountClick }>Confirm</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}
