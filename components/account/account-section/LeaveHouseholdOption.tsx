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
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { leaveHousehold } from "@/app/(app)/account/_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function LeaveHouseholdOption() {
    const router = useRouter();

    async function handleLeave() {
        const result = await leaveHousehold();
        if (result.success) {
            toast.success(result.message);
            if (result.redirect) router.replace(result.redirect);
        } else toast.error(result.message);
    }

    return <>
        <AlertDialog>
            <AlertDialogTrigger>
                <SettingsItem title="Leave household" icon={ <LogOut/> } destructive/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. You will have to be invited again into this household.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction asChild>
                        <Button variant="destructive" onClick={ handleLeave }>Leave household</Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>;
}
