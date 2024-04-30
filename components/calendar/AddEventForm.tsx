"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EventFormSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import CustomDatePicker from "@/components/login/CustomDatePicker";
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import Link from "next/link";
import { createEvent } from "@/app/(app)/calendar/_actions";
import { toast } from "sonner";

interface AddEventFormProps {
    frequencyOptions: { value: string; label: string }[]
}

export default function AddEventForm({ frequencyOptions }: AddEventFormProps) {
    const router = useRouter();
    const form = useForm<z.infer<typeof EventFormSchema>>({
        resolver: zodResolver(EventFormSchema),
        defaultValues: {
            title: "",
            date: new Date(),
            frequency: frequencyOptions[0].value,
            repeating: false,
        }
    });

    async function onsubmit(values: z.infer<typeof EventFormSchema>) {
        const result = await createEvent(values);

        if (result.success) toast.success(result.message);
        else toast.error(result.message);
        // @ts-ignore
        if (result.redirectTo) router.push(result.redirectTo);
    }

    return <Form { ...form }>
        <form onSubmit={ form.handleSubmit(onsubmit) } className="space-y-5">
            <FormField
                control={ form.control }
                name="title"
                render={ ({ field }) => (
                    <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input { ...field }/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <FormField
                control={ form.control }
                name="date"
                render={ ({ field }) => (
                    <FormItem>
                        <FormLabel>Date</FormLabel>
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
                name="repeating"
                render={ ({ field }) => (
                    <FormItem>
                        <div className="flex items-center">
                            <FormControl>
                                <Switch
                                    checked={ field.value }
                                    onCheckedChange={ field.onChange }
                                    className="mr-3"
                                />
                            </FormControl>
                            <FormLabel>Repeating</FormLabel>
                        </div>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <FormField
                control={ form.control }
                name="frequency"
                render={ ({ field }) => (
                    <FormItem className={ form.getValues("repeating") ? "" : "opacity-0 pointer-events-none" }>
                        <FormLabel>Frequency</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={ cn(
                                            "w-full justify-between",
                                            !field.value && "text-muted-foreground"
                                        ) }
                                    >
                                        { field.value
                                            ? frequencyOptions.find(
                                                (option) => option.value === field.value
                                            )?.label
                                            : "Select frequency" }
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="p-0">
                                <Command>
                                    {/*<CommandInput placeholder="Search frequency..."/>*/ }
                                    {/*<CommandEmpty>No frequency found.</CommandEmpty>*/ }
                                    <CommandGroup>
                                        <CommandList>
                                            { frequencyOptions.map(({ value, label }) => (
                                                <CommandItem
                                                    value={ label }
                                                    key={ value }
                                                    onSelect={ () => {
                                                        form.setValue("frequency", value)
                                                    } }
                                                >
                                                    <Check
                                                        className={ cn(
                                                            "mr-2 h-4 w-4",
                                                            value === field.value
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        ) }
                                                    />
                                                    { label }
                                                </CommandItem>
                                            )) }
                                        </CommandList>
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <Button type="submit" className="w-full">Add event</Button>
            <Button variant="secondary" className="w-full" asChild>
                <Link href="/calendar">
                    Cancel
                </Link>
            </Button>
        </form>
    </Form>;
}
