"use client";

import { z } from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import CustomDatePicker from "@/components/login/CustomDatePicker";

const formSchema = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        birthDate: z.date().optional(),
        email: z.string().email(),
        password: z.string().min(8),
        passwordRepeat: z.string(),
    })
    .superRefine(({ password, passwordRepeat }, ctx) => {
        if (password !== passwordRepeat) {
            ctx.addIssue({
                code: 'custom',
                message: "The passwords do not match",
            })
        }
    })

export default function RegisterForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    return <Form { ...form }>
        <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-2">
            <FormField
                control={ form.control }
                name='firstName'
                render={ ({ field }) => (
                    <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                            <Input placeholder="First name" { ...field }/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <FormField
                control={ form.control }
                name='lastName'
                render={ ({ field }) => (
                    <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                            <Input placeholder="Last name" { ...field }/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <FormField
                control={ form.control }
                name='birthDate'
                render={ ({ field }) => (
                    <FormItem>
                        <FormLabel>Date of birth (optional)</FormLabel>
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
                            <PopoverContent className="w-auto p-0" align="center">
                                <CustomDatePicker date={ field.value } setDate={ field.onChange }/>
                            </PopoverContent>
                        </Popover>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <FormField
                control={ form.control }
                name='email'
                render={ ({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" type="email" { ...field }/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <FormField
                control={ form.control }
                name='password'
                render={ ({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="Password" type="password" { ...field }/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <FormField
                control={ form.control }
                name='passwordRepeat'
                render={ ({ field }) => (
                    <FormItem>
                        <FormLabel>Password repeat</FormLabel>
                        <FormControl>
                            <Input placeholder="Password repeat" type="password" { ...field }/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <Button type="submit" className="w-full">Register</Button>
            <Button type="button" variant="link" onClick={ () => router.push("/login") }
                    className="w-full">Login</Button>
        </form>
    </Form>
};
