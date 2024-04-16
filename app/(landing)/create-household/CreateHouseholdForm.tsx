"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CreateHouseholdFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createHousehold } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateHouseholdForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof CreateHouseholdFormSchema>>({
        resolver: zodResolver(CreateHouseholdFormSchema),
        defaultValues: {
            householdName: "",
        },
    });

    async function onSubmit(values: z.infer<typeof CreateHouseholdFormSchema>) {
        const result = await createHousehold(values);

        if (result.success) {
            router.replace(result.redirect!);
        } else {
            toast.error(result.message);
        }
    }

    return <Form { ...form }>
        <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-5">
            <FormField
                control={ form.control }
                name="householdName"
                render={ ({ field }) => (
                    <FormItem>
                        <FormLabel>Household name</FormLabel>
                        <FormControl>
                            <Input { ...field } />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <Button className="w-full">Create</Button>
            <Alert className="text-secondary-foreground">
                <Info style={ { color: "var(--tw-text-secondary-foreground)" } }/>
                <AlertDescription>
                    You can create a new household or wait for an invite from an existing one.
                </AlertDescription>
            </Alert>
        </form>
    </Form>
};
