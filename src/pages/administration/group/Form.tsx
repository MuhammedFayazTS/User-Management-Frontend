import { useEffect, useState } from 'react';
import DefaultTextInput from '@/components/core/DefaultTextInput'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/core/Layout';
import DefaultTextArea from '@/components/core/DefaultTextArea';
import FormFooter from '@/components/core/FormFooter';
import { useHeaderContext } from '@/context/header-provider';
import { useGroupStore } from '@/store/client';
import SkeletonForm from '@/components/loaders/SkeletonForm';
import { handleMutationError, handleSuccessResponse } from '@/utils/handleMutationResponse';
import EditButton from '@/components/buttons/EditButton';
import { BaseApiResponse } from '@/types/common';
import { useAddGroup, useGetGroup, useUpdateGroup } from '@/store/server/group';
import { groupSchema } from './schema';
import { useGetRoles } from '@/store/server/role';
import { Role } from '@/types/role';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetUsers } from '@/store/server/user';
import { User } from '@/types/user';
import { SelectableList } from '@/components/SelectableList';

const defaultValues = {
    name: "",
    description: "",
}

const GroupForm = () => {
    const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
    const [selectedUsers, setSelectedUsers] = useState<User[]>([])
    const { reset: resetDatabaseId, toggleViewPage, databaseId, isViewPage } = useGroupStore((state) => state);

    const { mutate: addGroupMutation, isPending: isAddGroupPending } = useAddGroup();
    const { mutate: updateGroupMutation, isPending: isUpdateGroupPending } = useUpdateGroup();

    const { data: roleData, isLoading: isRolesLoading } = useGetRoles({ search: undefined });
    const { data: userData, isLoading: isUsersLoading } = useGetUsers({ search: undefined });
    const { data: groupData, isLoading } = useGetGroup(databaseId ?? undefined);

    const { setIsLoading } = useHeaderContext()
    const formSchema = groupSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues
    });

    const { reset } = form;

    useEffect(() => {
        if (!isLoading && groupData?.group) {
            reset(groupData.group);
            setSelectedRoles(groupData.group?.roles)
            setSelectedUsers(groupData.group?.users)
        }
        if (!databaseId) {
            reset(defaultValues)
        }
    }, [isLoading, groupData, reset, databaseId]);

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
        const updatedValues = { ...values, roles: selectedRoles, users: selectedUsers }
        if (!databaseId) {
            addGroupMutation(updatedValues, mutationConfig);
        } else {
            updateGroupMutation({ id: databaseId, data: updatedValues }, mutationConfig);
        }
        await resetDatabaseId()
    };

    const onClickEditButton = () => toggleViewPage(false)

    const isRoleSelected = (roleId: number) => {
        return selectedRoles.some(
            (role) => role.id === roleId
        );
    };

    const isUserSelected = (userId: number) => {
        return selectedUsers.some(
            (user) => user.id === userId
        );
    };

    const handleRoleChange = (role: Role) => {
        if (!setSelectedRoles) return;

        const updatedRoles = isRoleSelected(role.id)
            ? selectedRoles.filter(
                (r) => r.id !== role.id
            )
            : [...selectedRoles, role];

        setSelectedRoles(updatedRoles);
    };

    const handleUserChange = (user: User) => {
        if (!setSelectedUsers) return;

        const updatedUsers = isUserSelected(user.id)
            ? selectedUsers.filter(
                (r) => r.id !== user.id
            )
            : [...selectedUsers, user];

        setSelectedUsers(updatedUsers);
    };

    return (
        <Card className={isLoading ? 'w-[650px]' : 'w-full'}>
            <CardHeader>
                <CardTitle>
                    {databaseId ? 'Update' : 'Create'} Group
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
                                        <Tabs defaultValue="roles" className="w-full">
                                            <TabsList className='w-full flex'>
                                                <TabsTrigger value="roles" className='flex-1'>Roles</TabsTrigger>
                                                <TabsTrigger value="users" className='flex-1'>Users</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="roles">
                                                <SelectableList
                                                    isLoading={isRolesLoading}
                                                    data={roleData?.roles.rows || []}
                                                    isSelected={isRoleSelected}
                                                    handleChange={handleRoleChange}
                                                    isViewPage={isViewPage}
                                                />
                                            </TabsContent>

                                            <TabsContent value="users">
                                                <SelectableList
                                                    isLoading={isUsersLoading}
                                                    data={userData?.users.rows || []}
                                                    isSelected={isUserSelected}
                                                    handleChange={handleUserChange}
                                                    isViewPage={isViewPage}
                                                />
                                            </TabsContent>
                                        </Tabs>
                                    </Layout>
                                </Layout>
                                {!isViewPage && <FormFooter isSubmitting={isAddGroupPending || isUpdateGroupPending} />}
                            </form>
                        </Form>)}
            </CardContent>
        </Card>
    )
}

export default GroupForm