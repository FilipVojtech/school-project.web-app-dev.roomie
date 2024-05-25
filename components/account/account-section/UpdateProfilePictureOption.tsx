import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { ImageIcon } from "lucide-react";
import SettingsItem from "@/components/account/SettingsItem";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UpdateProfilePictureOption() {
    return <>
        <AlertDialog>
            <AlertDialogTrigger>
                <SettingsItem title="Update profile picture" icon={ <ImageIcon/> }/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Change profile picture</AlertDialogTitle>
                </AlertDialogHeader>
                <p>Roomie uses Gravatar for user profile pictures.</p>
                <p>To change your profile picture, go to <Link href="https://gravatar.com/" className="underline"
                                                               target="_blank" rel="noopener noreferrer">Gravatar</Link> and sign up with the same
                    email address as here.</p>
                <p>Then just upload your new favourite image of yourself.</p>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild><Button>Close</Button></AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
};
