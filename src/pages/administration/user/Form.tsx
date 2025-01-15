import DefaultTextInput from '@/components/core/DefaultTextInput'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/core/Layout';
import FormFooter from '@/components/core/FormFooter';
import { useHeaderContext } from '@/context/header-provider';
import { useRoleStore } from '@/store/client';
import SkeletonForm from '@/components/loaders/SkeletonForm';
import { handleMutationError, handleSuccessResponse } from '@/utils/handleMutationResponse';
import EditButton from '@/components/buttons/EditButton';
import { userSchema } from './schema';
import { useAddUser } from '@/store/server/user';
import { AddOrUpdateUserResponse } from '@/types/user';

const RoleForm = () => {
    const { reset: resetDatabaseId, toggleViewPage, databaseId, isViewPage } = useRoleStore((state) => state);

    const isLoading =false //temperory

    const { mutate: addUserMutation, isPending: isAddUserPending } = useAddUser();
    // const { mutate: updateRoleMutation, isPending: isUpdateRolePending } = useUpdateRole();
    // const { data: roleData, isLoading } = useGetRole(databaseId ?? undefined);

    const { setIsLoading } = useHeaderContext()
    const formSchema = userSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
    });

    const { reset } = form;

    // useEffect(() => {
    //     if (!isLoading && roleData?.role) {
    //         reset(roleData.role);
    //         setSelectedPermissions(roleData.role?.permissions)
    //     }
    // }, [isLoading, roleData, reset]);

    const successCallback = () => {
        reset();
        setIsLoading(false)
    }

    const errorCallback = () => {
        setIsLoading(false)
    }

    const mutationConfig = {
        onSuccess: (response: AddOrUpdateUserResponse) => handleSuccessResponse(true, response?.message, successCallback),
        onError: (error: unknown) => handleMutationError(error, errorCallback),
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        if (!databaseId) {
            addUserMutation(values, mutationConfig);
        } else {
            // updateRoleMutation({ id: databaseId, data: values }, mutationConfig);
        }
        await resetDatabaseId()
    };

    const onClickEditButton = () => toggleViewPage(false)

    return (
        <Card className={isLoading ? 'w-[650px]' : 'w-full'}>
            <CardHeader>
                <CardTitle>
                    {databaseId ? 'Update' : 'Create'} User
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
                                            name='firstName'
                                            label='First Name'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                        <DefaultTextInput
                                            name='lastName'
                                            label='Last Name'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                        <DefaultTextInput
                                            name='email'
                                            label='Email'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                    </Layout>
                                </Layout>
                                {!isViewPage && <FormFooter isSubmitting={isAddUserPending} />}
                            </form>
                        </Form>)}
            </CardContent>
        </Card>
    )
}

export default RoleForm