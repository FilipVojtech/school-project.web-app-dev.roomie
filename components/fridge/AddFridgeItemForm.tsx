'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FridgeItemFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import CustomDatePicker from "@/components/login/CustomDatePicker";
import React from "react";
import Link from "next/link";
import { addFridgeItem } from "@/app/(app)/fridge/_actions";
import { toast } from "sonner";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

export default function AddFridgeItemForm({ options }: { options: Option[] }) {
    const router = useRouter();
    const form = useForm<z.infer<typeof FridgeItemFormSchema>>({
        resolver: zodResolver(FridgeItemFormSchema),
        defaultValues: {
            name: "",
            expiryDate: new Date(),
            quantity: 1,
            owners: options.filter(value => value.fixed),
        }
    });

    async function onSubmit(data: z.infer<typeof FridgeItemFormSchema>) {
        const result = await addFridgeItem(data);

        if (result.success) {
            toast.success(result.message);
            router.push("/fridge");
        } else {
            toast.error(result.message);
        }
    }

    return <>
        <Form { ...form }>
            <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-5">
                <FormField
                    control={ form.control }
                    name="name"
                    render={ ({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Eggs" { ...field }/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    ) }
                />
                <FormField
                    control={ form.control }
                    name="quantity"
                    render={ ({ field }) => (
                        <FormItem>
                            <FormLabel>Quantity</FormLabel>
                            <FormControl>
                                <Input type="number" { ...field }/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    ) }
                />
                <FormField
                    control={ form.control }
                    name="expiryDate"
                    render={ ({ field }) => (
                        <FormItem>
                            <FormLabel>Expiration date</FormLabel>
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant="outline"
                                                className={ cn(
                                                    "w-full pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                ) }
                                            >
                                                { field.value ? (
                                                    format(field.value, "P")
                                                ) : (
                                                    <span>Pick a date</span>
                                                ) }
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto" align="center">
                                        <CustomDatePicker date={ field.value } setDate={ field.onChange }/>
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    ) }
                />
                <FormField
                    control={ form.control }
                    name="owners"
                    render={ ({ field }) => (
                        <FormItem>
                            <FormLabel>Owner</FormLabel>
                            <FormControl>
                                <MultipleSelector
                                    selectFirstItem={ true }
                                    defaultOptions={ options }
                                    placeholder="Choose additional owners (optional)"
                                    { ...field }
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    ) }
                />
                <Button type="submit" className="w-full">Add item</Button>
                <Button variant="secondary" className="w-full" asChild>
                    <Link href="/fridge">
                        Cancel
                    </Link>
                </Button>
            </form>
        </Form>
    </>;
}
