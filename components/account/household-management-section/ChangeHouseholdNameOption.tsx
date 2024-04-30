"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChangeHouseHoldNameFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { changeEmail, changeHouseholdName } from "@/app/(app)/account/_actions";
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
import { Pencil } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChangeHouseHoldNameOptionProps {
    name: string
}

export default function ChangeHouseHoldNameOption({ name }: ChangeHouseHoldNameOptionProps) {
    const form = useForm<z.infer<typeof ChangeHouseHoldNameFormSchema>>({
        resolver: zodResolver(ChangeHouseHoldNameFormSchema),
        defaultValues: {
            name,
        },
    });

    async function onSubmit(values: z.infer<typeof ChangeHouseHoldNameFormSchema>) {
        const result = await changeHouseholdName(values);

        if (result.success) toast.success(result.message);
        else toast.error(result.message);
    }

    return <>
        <Dialog>
            <DialogTrigger asChild>
                <SettingsItem title="Change household name" icon={ <Pencil/> }/>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change household name</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form { ...form }>
                        <form onSubmit={ form.handleSubmit(onSubmit) }>
                            <FormField
                                control={ form.control }
                                name="name"
                                render={ ({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4">
                                        <FormLabel className="text-right">Household name</FormLabel>
                                        <FormControl>
                                            <Input { ...field } className="col-span-3"/>
                                        </FormControl>
                                    </FormItem>
                                ) }
                            />
                            <DialogFooter className="mt-8 -mb-4">
                                <DialogClose>
                                    <Button type="submit">Change name</Button>
                                </DialogClose>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    </>;
}
