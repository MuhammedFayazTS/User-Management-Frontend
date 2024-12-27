import { useState } from "react";
import { ArrowRight, Loader, MailCheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import {
  Form,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { registerMutationFn } from "@/api/auth";
import { registerSchema } from "./schema";
import { Link } from "react-router";
import { useToast } from "@/hooks/use-toast";
import { handleAxiosError } from "@/api/api-error";
import GoogleLogin from "@/components/GoogleLogin"
import DefaultTextInput from "@/components/core/DefaultTextInput";

export default function SignUp() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast()

  const { mutate, isPending } = useMutation({
    mutationFn: registerMutationFn,
  });

  const formSchema = registerSchema()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
    <>
      <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
        {!isSubmitted ? (
          <div className="w-full p-5 rounded-md">
            <Logo />

            <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-1.5 mt-8 text-center sm:text-left">
              Create a AuthMatic account
            </h1>
            <p className="mb-5 text-center sm:text-left text-base dark:text-[#f1f7feb5] font-normal">
              Already have an account?{" "}
              <Link className="text-primary hover:text-purple-500" to="/">
                Sign in
              </Link>
              .
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mb-4">
                <DefaultTextInput
                    control={form.control}
                    name="firstName"
                    label="First Name"
                    placeholder="John"
                    type="text"
                  />
                </div>
                <div className="mb-4">
                  <DefaultTextInput
                    control={form.control}
                    name="lastName"
                    label="Last Name"
                    placeholder="Doe"
                    type="text"
                  />
                </div>
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
                <div className="mb-4">
                    <DefaultTextInput
                      control={form.control}
                      name="confirmPassword"
                      label="Confirm Password"
                      placeholder="••••••••••••"
                      type="password"
                    />
                </div>
                <Button
                  disabled={isPending}
                  className="w-full text-[15px] h-[40px] !bg-purple-500 text-white font-semibold"
                  type="submit"
                >
                  {isPending && <Loader className="animate-spin" />}
                  Create account
                  <ArrowRight />
                </Button>

                <div className="mb-3 mt-4 flex items-center justify-center">
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
            <p className="text-xs font-normal mt-4">
              By signing up, you agree to our{" "}
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
        ) : (
          <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
            <div className="size-[48px]">
              <MailCheckIcon size="48px" className="animate-bounce" />
            </div>
            <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
              Check your email
            </h2>
            <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
              We just sent a verification link to {form.getValues().email}.
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
    </>
  );
}