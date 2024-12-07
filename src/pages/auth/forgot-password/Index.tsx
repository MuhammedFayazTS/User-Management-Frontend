"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { forgotPasswordMutationFn } from "@/api/auth.service";
import { ArrowRight, Loader, MailCheckIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link, useSearchParams } from "react-router-dom";
import { forgotPasswordSchema } from "./schema";
import { handleAxiosError } from "@/api/api-error";

export default function ForgotPassword() {
    const [param] = useSearchParams();
    const email = param.get("email");

    const [isSubmitted, setIsSubmitted] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: forgotPasswordMutationFn,
    });

    const formSchema = forgotPasswordSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email || "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values, {
            onSuccess: () => {
                setIsSubmitted(true);
            },
            onError: (error) => {
                const { statusCode, message } = handleAxiosError(error);
                console.log({ statusCode, error });
                toast({
                    title: "Error",
                    description: message,
                    variant: "destructive",
                });
            },
        });
    };

    return (
        <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center ">
            {!isSubmitted ? (
                <div className="w-full h-full p-5 rounded-md">
                    <Logo />

                    <h1
                        className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8
        text-center sm:text-left"
                    >
                        Reset password
                    </h1>
                    <p className="mb-6 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
                        Include the email address associated with your account and we’ll
                        send you an email with instructions to reset your password.
                    </p>
                    <Form {...form}>
                        <form
                            className="flex flex-col gap-6"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="mb-0">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                                                Email
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="youremail@mail.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full text-[15px] h-[40px] !bg-purple-500 text-white font-semibold"
                            >
                                {isPending && <Loader className="animate-spin" />}
                                Send reset instructions
                            </Button>
                        </form>
                    </Form>
                </div>
            ) : (
                <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
                    <div className="size-[48px]">
                        <MailCheckIcon size="48px" className="animate-bounce" />
                    </div>
                    <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
                        Check your email
                    </h2>
                    <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
                        We just sent a password reset link to {form.getValues().email}.
                    </p>
                    <Link to="/">
                        <Button className="h-[40px]">
                            Go to login
                            <ArrowRight />
                        </Button>
                    </Link>
                </div>
            )}
        </main>
    );
}