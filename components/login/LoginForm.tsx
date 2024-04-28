"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { authenticate } from "@/app/_actions";
import { LoginFormSchema } from "@/lib/schema";
import { toast } from "sonner";

export default function LoginForm() {
    const router = useRouter();
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
        const result = await authenticate(values);

        if (!result) return;
        if (result.success) router.replace(result.redirect!);
        else toast.error(result.message);
    }

    return <Form { ...form }>
        <form onSubmit={ form.handleSubmit(onSubmit) } className="space-y-5">
            <FormField
                control={ form.control }
                name='email'
                render={ ({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" { ...field }/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <FormField
                control={ form.control }
                name="password"
                render={ ({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input type="password" placeholder="Password"{ ...field }/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                ) }
            />
            <LoginButton/>
            <Button
                className="w-full"
                variant="link"
                type="button"
                onClick={ () => router.push("/register") }
            >Register</Button>
        </form>
    </Form>;
}

function LoginButton() {
    const { pending } = useFormStatus();
    return <Button className="w-full" disabled={ pending }>
        { pending && <Loader2 className="mr-2 animate-spin"/> }
        Log in
    </Button>
}
