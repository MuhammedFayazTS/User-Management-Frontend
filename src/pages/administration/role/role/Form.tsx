import DefaultTextInput from '@/components/core/DefaultTextInput'
import { roleSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { handleAxiosError } from '@/api/api-error';
import { useAddRole, useGetRole, useUpdateRole } from '@/api/role';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/core/Layout';
import DefaultTextArea from '@/components/core/DefaultTextArea';
import FormFooter from '@/components/core/FormFooter';
import { useHeaderContext } from '@/context/header-provider';
import PermissionCards from '@/components/cards/PermissionCards';
import { Module } from '@/types/module';
import { Loader } from 'lucide-react';
import { Permission } from '@/types/permission';
import { useEffect, useState } from 'react';
import { useGetModules } from '@/api/modules';
import { useRoleStore } from '@/store/client';
import SkeletonForm from '@/components/loaders/SkeletonForm';

const RoleForm = () => {
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([])
    const resetDatabaseId = useRoleStore((state) => state.reset);
    const databaseId = useRoleStore((state) => state.databaseId);

    const { mutate: addRoleMutation, isPending: isAddRolePending } = useAddRole();
    const { mutate: updateRoleMutation, isPending: isUpdateRolePending } = useUpdateRole();

    const { data: modulesData, isLoading: isModulesLoading } = useGetModules({ search: null })
    const { data: roleData, isLoading } = useGetRole(databaseId)

    const { setIsLoading } = useHeaderContext()
    const formSchema = roleSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            permissions: []
        },
    });

    const { reset } = form;

    useEffect(() => {
        if (!isLoading && roleData?.role) {
            reset(roleData.role);
            setSelectedPermissions(roleData.role?.permissions)
        }
    }, [isLoading, roleData, reset]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        const updatedValues = { ...values, permissions: selectedPermissions }
        if (!databaseId) {
            addRoleMutation(updatedValues, {
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
        } else {
            updateRoleMutation(
                { id: databaseId, data: updatedValues },
                {
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
        }
        await resetDatabaseId()
    };

    console.log('Form Errors:', form.formState.errors);

    return (
        <Card className={isLoading ? 'w-[650px]' : 'w-full'}>
            <CardHeader>
                <CardTitle>{databaseId ? 'Update' : 'Create'} Role</CardTitle>
            </CardHeader>
            <CardContent>
                {
                    isLoading ?
                        <SkeletonForm rows={3} fieldsPerRow={1} fieldWidth={600} fieldHeight={35} /> :
                        (<Form {...form}>
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
                                            isModulesLoading ?
                                                <Loader className='animate-spin' />
                                                :
                                                modulesData?.modules?.rows?.map((module: Module) => (
                                                    <PermissionCards module={module} setUserSelectedPermissions={setSelectedPermissions} userSelectedPermissions={selectedPermissions} />
                                                ))
                                        }
                                    </Layout>
                                </Layout>
                                <FormFooter isSubmitting={isAddRolePending || isUpdateRolePending} />
                            </form>
                        </Form>)}
            </CardContent>
        </Card>
    )
}

export default RoleForm