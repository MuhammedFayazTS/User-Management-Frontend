import { useEffect, useState } from 'react';
import DefaultTextInput from '@/components/core/DefaultTextInput'
import { roleSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useAddRole, useGetRole, useUpdateRole } from '@/store/server/role';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/core/Layout';
import DefaultTextArea from '@/components/core/DefaultTextArea';
import FormFooter from '@/components/core/FormFooter';
import { useHeaderContext } from '@/context/header-provider';
import PermissionCards from '@/components/cards/PermissionCards';
import { Module } from '@/types/module';
import { Loader } from 'lucide-react';
import { Permission } from '@/types/permission';
import { useRoleStore } from '@/store/client';
import SkeletonForm from '@/components/loaders/SkeletonForm';
import { useGetModules } from '@/store/server/modules';
import { handleMutationError, handleSuccessResponse } from '@/utils/handleMutationResponse';
import EditButton from '@/components/buttons/EditButton';
import { BaseApiResponse } from '@/types/common';

const RoleForm = () => {
    const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([])
    const { reset: resetDatabaseId, toggleViewPage, databaseId, isViewPage } = useRoleStore((state) => state);

    const { mutate: addRoleMutation, isPending: isAddRolePending } = useAddRole();
    const { mutate: updateRoleMutation, isPending: isUpdateRolePending } = useUpdateRole();

    const { data: modulesData, isLoading: isModulesLoading } = useGetModules({ search: undefined });
    const { data: roleData, isLoading } = useGetRole(databaseId ?? undefined);

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

    const successCallback = () => {
        reset();
        setIsLoading(false)
    }

    const errorCallback = () => {
        setIsLoading(false)
    }

    const mutationConfig = {
        onSuccess: (response: BaseApiResponse) => handleSuccessResponse(true, response?.message, successCallback),
        onError: (error: unknown) => handleMutationError(error, errorCallback),
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        const updatedValues = { ...values, permissions: selectedPermissions }
        if (!databaseId) {
            addRoleMutation(updatedValues, mutationConfig);
        } else {
            updateRoleMutation({ id: databaseId, data: updatedValues }, mutationConfig);
        }
        await resetDatabaseId()
    };

    const onClickEditButton = () => toggleViewPage(false)

    return (
        <Card className={isLoading ? 'w-[650px]' : 'w-full'}>
            <CardHeader>
                <CardTitle>
                    {databaseId ? 'Update' : 'Create'} Role
                    {isViewPage && <EditButton customClass='ml-3' onClick={onClickEditButton} />}
                </CardTitle>
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
                                            readOnly={isViewPage}
                                        />
                                        <DefaultTextArea
                                            name='description'
                                            label='Description'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                    </Layout>
                                    <Layout>
                                        {
                                            isModulesLoading ?
                                                <Loader className='animate-spin' />
                                                :
                                                modulesData?.modules?.rows?.map((module: Module) => (
                                                    <PermissionCards
                                                        module={module}
                                                        isViewPage={isViewPage}
                                                        setUserSelectedPermissions={setSelectedPermissions}
                                                        userSelectedPermissions={selectedPermissions} />
                                                ))
                                        }
                                    </Layout>
                                </Layout>
                                {!isViewPage && <FormFooter isSubmitting={isAddRolePending || isUpdateRolePending} />}
                            </form>
                        </Form>)}
            </CardContent>
        </Card>
    )
}

export default RoleForm