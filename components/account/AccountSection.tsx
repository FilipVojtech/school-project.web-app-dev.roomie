"use client";

import SettingsSection from "@/components/account/SettingsSection";
import SettingsItem from "@/components/account/SettingsItem";
import { AtSign, ImageIcon, Lock, LogOut, TextCursorInput, Trash2 } from "lucide-react"
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { ChangeNameFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react"
import { toast } from "sonner";
import { changeName } from "@/app/(app)/account/_actions";

export default function AccountSection() {
    return <SettingsSection title="Account">
        <SettingsItem title="Update profile picture" icon={ <ImageIcon/> } hidden/>
        <ChangeNameOption/>
        <SettingsItem title="Change email" icon={ <AtSign/> }/>
        <SettingsItem title="Change password" icon={ <Lock/> }/>
        <SettingsItem title="Leave household" icon={ <LogOut/> } destructive/>
        <SettingsItem title="Delete account" icon={ <Trash2/> } destructive/>
    </SettingsSection>;
}

function ChangeNameOption() {
    let formDefaults = {
        firstName: "",
        lastName: "",
    };
    const { update, data: session } = useSession();
    if (!!session?.user) {
        formDefaults = {
            firstName: session.user.firstName,
            lastName: session.user.lastName,
        };
    }
    const form = useForm<z.infer<typeof ChangeNameFormSchema>>({
        resolver: zodResolver(ChangeNameFormSchema),
        defaultValues: formDefaults,
    });

    async function onSubmit(values: z.infer<typeof ChangeNameFormSchema>) {
        const result = await changeName(values);

        if (result.success) {
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }
    }

    return <>
        <Dialog>
            <DialogTrigger asChild>
                <SettingsItem title="Change name" icon={ <TextCursorInput/> }/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change name</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form { ...form }>
                        <form onSubmit={ form.handleSubmit(onSubmit) }>
                            <FormField
                                control={ form.control }
                                name="firstName"
                                render={ ({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">First name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="First name" { ...field } className="col-span-3"/>
                                        </FormControl>
                                    </FormItem>
                                ) }
                            />
                            <FormField
                                control={ form.control }
                                name="lastName"
                                render={ ({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Last name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last name" { ...field } className="col-span-3"/>
                                        </FormControl>
                                    </FormItem>
                                ) }
                            />
                            <DialogFooter className="mt-8 -mb-4">
                                <DialogClose>
                                    <Button type="submit" onClick={ () => {
                                        form.reset({
                                            firstName: formDefaults.firstName,
                                            lastName: formDefaults.lastName
                                        })
                                    } }>Save changes</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    </>;
}
