import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowRight, Loader } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { toast } from "@/hooks/use-toast";
import { loginMutationFn } from "@/api/auth";
import { loginSchema } from "./schema";
import { handleAxiosError } from "@/api/api-error";
import GoogleLogin from "@/components/buttons/GoogleLogin"
import DefaultTextInput from "@/components/core/DefaultTextInput";

export default function Login() {
    const navigate = useNavigate();
    
    const [params] = useSearchParams();
    const tempPass = params.get("tempPass");
    const email = params.get("email");

    const { mutate, isPending } = useMutation({
        mutationFn: loginMutationFn,
    });

    const formSchema = loginSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: email ||"",
            password: tempPass || "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutate(values, {
            onSuccess: (response) => {
                if (response.data?.mfaRequired) {
                    navigate(`/verify-mfa?email=${values.email}`);
                    return;
                }
                navigate("/home");
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
        <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
            <div className="w-full h-full p-5 rounded-md">
                <Logo />

                <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8 text-center sm:text-left">
                    Log in to AuthMatic
                </h1>
                <p className="mb-8 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
                    Don't have an account?{" "}
                    <Link className="text-primary hover:text-purple-500" to="/signup">
                        Sign up
                    </Link>
                    .
                </p>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <DefaultTextInput
                                control={form.control}
                                name="email"
                                label="Email"
                                placeholder="johndoe@mail.com"
                                type="email"
                            />
                        </div>
                        <div className="mb-4">
                            <DefaultTextInput
                                control={form.control}
                                name="password"
                                label="Password"
                                placeholder="••••••••••••"
                                type="password"
                            />
                        </div>
                        <div className="mb-4 flex w-full items-center justify-end">
                            <Link
                                className="text-sm dark:text-white"
                                to={`/forgot-password?email=${form.getValues().email}`}
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <Button
                            disabled={isPending}
                            className="w-full text-[15px] h-[40px] !bg-purple-500 text-white font-semibold"
                            type="submit"
                        >
                            {isPending && <Loader className="animate-spin" />}
                            Sign in
                            <ArrowRight />
                        </Button>

                        <div className="mb-6 mt-6 flex items-center justify-center">
                            <div
                                aria-hidden="true"
                                className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                                data-orientation="horizontal"
                                role="separator"
                            ></div>
                            <span className="mx-4 text-xs dark:text-[#f1f7feb5] font-normal">
                                OR
                            </span>
                            <div
                                aria-hidden="true"
                                className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                                data-orientation="horizontal"
                                role="separator"
                            ></div>
                        </div>
                    </form>
                </Form>
                <GoogleLogin />
                <p className="text-xs dark:text-slate- font-normal mt-7">
                    By signing in, you agree to our{" "}
                    <a className="text-primary hover:underline" href="#">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a className="text-primary hover:underline" href="#">
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
        </main>
    );
}