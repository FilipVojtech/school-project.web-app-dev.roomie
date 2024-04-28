"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeEmailFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeEmail } from "@/app/(app)/account/_actions";
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
import { AtSign } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ChangeEmailOption() {
    const form = useForm<z.infer<typeof ChangeEmailFormSchema>>({
        resolver: zodResolver(ChangeEmailFormSchema),
        defaultValues: { email: "", },
    });

    async function onSubmit(values: z.infer<typeof ChangeEmailFormSchema>) {
        const result = await changeEmail(values);

        if (!!result && !result?.success) {
            toast.error(result.message);
            return;
        }
    }

    return <>
        <Dialog>
            <DialogTrigger asChild>
                <SettingsItem title="Change email" icon={ <AtSign/> }/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change email address</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    For security reasons, you will be logged out after changing your email.
                </DialogDescription>
                <div className="grid gap-4 py-4">
                    <Form { ...form }>
                        <form onSubmit={ form.handleSubmit(onSubmit) }>
                            <FormField
                                control={ form.control }
                                name="email"
                                render={ ({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">New email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" { ...field } className="col-span-3"/>
                                        </FormControl>
                                    </FormItem>
                                ) }
                            />
                            <DialogFooter className="mt-8 -mb-4">
                                <DialogClose>
                                    <Button type="submit">Change email</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    </>;
}
