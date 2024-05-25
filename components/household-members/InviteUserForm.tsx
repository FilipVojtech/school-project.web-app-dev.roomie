"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { InviteUserFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { sendInvite } from "@/app/(app)/household/members/_actions";
import { toast } from "sonner";
import { router } from "next/client";

export default function InviteUserForm() {
    const form = useForm<z.infer<typeof InviteUserFormSchema>>({
        resolver: zodResolver(InviteUserFormSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        }
    });

    async function onSubmit(values: z.infer<typeof InviteUserFormSchema>) {
        const result = await sendInvite(values);

        if (result.success) toast.success(result.message);
        else toast.error(result.message);

        router.reload();
    }

    return <>
        <Form { ...form }>
            <form onSubmit={ form.handleSubmit(onSubmit) }>
                <div className="space-y-5">
                    <FormField
                        control={ form.control }
                        name="firstName"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>First name</FormLabel>
                                <FormControl>
                                    <Input { ...field }/>
                                </FormControl>
                            </FormItem>
                        ) }
                    />
                    <FormField
                        control={ form.control }
                        name="lastName"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Last name</FormLabel>
                                <FormControl>
                                    <Input { ...field }/>
                                </FormControl>
                            </FormItem>
                        ) }
                    />
                    <FormField
                        control={ form.control }
                        name="email"
                        render={ ({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" { ...field }/>
                                </FormControl>
                            </FormItem>
                        ) }
                    />
                </div>
                <DialogFooter className="mt-5">
                    <DialogClose>
                        <Button variant="secondary" type="button">Cancel</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button type="submit">Send invite</Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    </>
};
