import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
    Form
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { changePasswordMutationFn } from "@/api/auth";
import { Loader } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { handleAxiosError } from "@/api/api-error";
import DefaultTextInput from "@/components/core/DefaultTextInput";
import { changePasswordSchema } from "./schema";
import Page from "@/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { getParentModuleBreadcrumb, ParentModules } from "@/utils/breadcrumb-modules-helper";

export default function ChangePassword() {
    const navigate = useNavigate();
    const { mutate, isPending } = useMutation({
        mutationFn: changePasswordMutationFn,
    });

    const formSchema = changePasswordSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const data = {
            oldPassword: values.oldPassword,
            password: values.password,
            confirmPassword: values.password,
        };
        mutate(data, {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Password change successfully",
                });
                navigate("/");
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
        <Page 
        title="Change Password"
        parentModules={getParentModuleBreadcrumb(ParentModules.ACCOUNT)}
        >
            <Card className="p-5 w-full md:w-[500px]">
                    <p className="mb-6 text-center sm:text-left text-[15px] dark:text-[#f1f7feb5] font-normal">
                        Your password must be different from your previous one.
                    </p>
                    <Form {...form}>
                        <form
                            className="flex flex-col gap-6"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="mb-0">
                                <DefaultTextInput
                                    control={form.control}
                                    name="oldPassword"
                                    label="Old password"
                                    placeholder="Enter your old password"
                                    autoComplete="off"
                                    type="password"
                                />
                            </div>
                            <div className="mb-0">
                                <DefaultTextInput
                                    control={form.control}
                                    name="password"
                                    label="New password"
                                    placeholder="Enter your new password"
                                    autoComplete="off"
                                    type="password"
                                />
                            </div>
                            <div className="mb-0">
                                <DefaultTextInput
                                    control={form.control}
                                    name="confirmPassword"
                                    label="Confirm new password"
                                    autoComplete="off"
                                    placeholder="Enter your password again"
                                    type="password"
                                />
                            </div>
    
                            <Button
                                disabled={isPending}
                                className="w-full text-[15px] h-[40px] !bg-purple-500 text-white font-semibold"
                            >
                                {isPending && <Loader className="animate-spin" />}
                                Reset password
                            </Button>
                        </form>
                    </Form>
            </Card>
        </Page>
    );
}