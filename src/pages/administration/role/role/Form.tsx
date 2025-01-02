import DefaultTextInput from '@/components/core/DefaultTextInput'
import { roleSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { handleAxiosError } from '@/api/api-error';
import { roleMutationFn } from '@/api/role';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/core/Layout';
import DefaultTextArea from '@/components/core/DefaultTextArea';
import FormFooter from '@/components/core/FormFooter';
import { useHeaderContext } from '@/context/header-provider';
import PermissionCards from '@/components/cards/PermissionCards';
import { Module } from '@/types/module';
import { Loader } from 'lucide-react';
import { Permission } from '@/types/permission';
import { useState } from 'react';
import { useGetModules } from '@/api/modules';

const RoleForm = () => {
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([])
    const { mutate, isPending } = useMutation({
        mutationFn: roleMutationFn,
    });

    const {data,isLoading} = useGetModules({search:null})

    const { setIsLoading } = useHeaderContext()
    const formSchema = roleSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            permissions:[]
        },
    });

    const { reset } = form;

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        const updatedValues = {...values,permissions:selectedPermissions}
        mutate(updatedValues, {
            onSuccess: (response) => {
                reset();
                toast({
                    title: response?.data?.message,
                    variant: "default",
                });
                setIsLoading(false);
            },
            onError: (error) => {
                const { statusCode, message } = handleAxiosError(error);
                console.log({ statusCode, error });
                toast({
                    title: "Error",
                    description: message,
                    variant: "destructive",
                });
                setIsLoading(false);
            },
        });
    };

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Create Role</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => reset()} className="space-y-8">
                        <Layout stack gap={5}>
                            <Layout stack width={450}>
                                <DefaultTextInput
                                    name='name'
                                    label='Name'
                                    control={form.control}
                                />
                                <DefaultTextArea
                                    name='description'
                                    label='Description'
                                    control={form.control}
                                />
                            </Layout>
                            <Layout>
                                {
                                    isLoading? 
                                    <Loader className='animate-spin' />
                                    :
                                    data?.modules?.rows?.map((module:Module) => (
                                        <PermissionCards module={module} setUserSelectedPermissions={setSelectedPermissions} userSelectedPermissions={selectedPermissions} />
                                    ))
                                }
                                </Layout>
                        </Layout>
                        <FormFooter isSubmitting={isPending} />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default RoleForm