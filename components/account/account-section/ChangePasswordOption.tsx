"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangePasswordFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeEmail, changePassword } from "@/app/(app)/account/_actions";
import { toast } from "sonner";
import {
    Dialog,
    DialogClose,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import SettingsItem from "@/components/account/SettingsItem";
import { Lock } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChangePasswordOption() {
    const form = useForm<z.infer<typeof ChangePasswordFormSchema>>({
        resolver: zodResolver(ChangePasswordFormSchema),
        defaultValues: {
            passwordRepeat: "",
            password: "",
            currentPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof ChangePasswordFormSchema>) {
        const result = await changePassword(values);

        if (!!result) {
            if (!result?.success) toast.error(result.message);
            else toast.success(result.message);
        }
    }

    return <>
        <Dialog>
            <DialogTrigger asChild>
                <SettingsItem title="Change password" icon={ <Lock/> }/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change password</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    For security reasons, you will be logged out after changing your password.<br/><br/>
                    To verify that it&apos;s you, you&apos;re required to enter your current password.
                </DialogDescription>
                <div className="grid gap-4 py-4">
                    <Form { ...form }>
                        <form onSubmit={ form.handleSubmit(onSubmit) }>
                            <FormField
                                control={ form.control }
                                name="password"
                                render={ ({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">New password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="New password"
                                                { ...field }
                                                className="col-span-3"/>
                                        </FormControl>
                                    </FormItem>
                                ) }
                            />
                            <FormField
                                control={ form.control }
                                name="passwordRepeat"
                                render={ ({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Repeat new password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Verify new password" { ...field }
                                                   className="col-span-3"/>
                                        </FormControl>
                                    </FormItem>
                                ) }
                            />
                            <FormField
                                control={ form.control }
                                name="currentPassword"
                                render={ ({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Current password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Current password"
                                                { ...field }
                                                className="col-span-3"
                                            />
                                        </FormControl>
                                    </FormItem>
                                ) }
                            />
                            <DialogFooter className="mt-8 -mb-4">
                                <DialogClose>
                                    <Button type="submit">Change password</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    </>;
}
