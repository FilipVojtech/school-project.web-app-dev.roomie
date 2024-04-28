"use client"

import {
    Dialog, DialogClose,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import SettingsItem from "@/components/account/SettingsItem";
import { TextCursorInput } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeNameFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeName } from "@/app/(app)/account/_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ChangeNameOption({ firstName, lastName }: { firstName: string, lastName: string }) {
    const router = useRouter();
    const form = useForm<z.infer<typeof ChangeNameFormSchema>>({
        resolver: zodResolver(ChangeNameFormSchema),
        defaultValues: {
            firstName,
            lastName,
        },
    });

    async function onSubmit(values: z.infer<typeof ChangeNameFormSchema>) {
        const result = await changeName(values);

        if (result.success) {
            toast.success(result.message);
            router.refresh();
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
                                    <Button type="submit">Save changes</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    </>;
}
