import { useEffect } from 'react';
import DefaultTextInput from '@/components/core/DefaultTextInput'
import { roomTypeSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useAddRoomType, useGetRoomType, useUpdateRoomType } from '@/store/server/room-type';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/core/Layout';
import DefaultTextArea from '@/components/core/DefaultTextArea';
import FormFooter from '@/components/core/FormFooter';
import { useHeaderContext } from '@/context/header-provider';
import { useRoomTypeStore } from '@/store/client';
import SkeletonForm from '@/components/loaders/SkeletonForm';
import { handleMutationError, handleSuccessResponse } from '@/utils/handleMutationResponse';
import EditButton from '@/components/buttons/EditButton';
import { BaseApiResponse } from '@/types/common';
import { useGetBranchesForSelect } from '@/store/server/branch';
import { DefaultSelect } from '@/components/core/DefaultSelect';

const defaultValues = {
    name: "",
    description: "",
    price: undefined,
    branchId: undefined
}

const RoomTypeForm = () => {
    const { reset: resetDatabaseId, toggleViewPage, databaseId, isViewPage } = useRoomTypeStore((state) => state);

    const { mutate: addRoomTypeMutation, isPending: isAddRoomTypePending } = useAddRoomType();
    const { mutate: updateRoomTypeMutation, isPending: isUpdateRoomTypePending } = useUpdateRoomType();

    const { data: roomTypeData, isLoading } = useGetRoomType(databaseId ?? undefined);
    const { data: branchesData, isLoading: isBranchesLoading } = useGetBranchesForSelect();

    const { setIsLoading } = useHeaderContext()
    const formSchema = roomTypeSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const { reset } = form;

    useEffect(() => {
        if (!isLoading && roomTypeData?.roomType) {
            reset(roomTypeData.roomType);
        }
        if (!databaseId) {
            reset(defaultValues)
        }
    }, [isLoading, roomTypeData, reset, databaseId]);

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
        const updatedValues = { ...values }
        if (!databaseId) {
            addRoomTypeMutation(updatedValues, mutationConfig);
        } else {
            updateRoomTypeMutation({ id: databaseId, data: updatedValues }, mutationConfig);
        }
        await resetDatabaseId()
    };

    const onClickEditButton = () => toggleViewPage(false)

    return (
        <Card className={isLoading ? 'w-[650px]' : 'w-full'}>
            <CardHeader>
                <CardTitle>
                    {databaseId ? 'Update' : 'Create'} Room Type
                    {isViewPage && <EditButton customClass='ml-3' onClick={onClickEditButton} />}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {
                    isLoading ?
                        <SkeletonForm rows={3} fieldsPerRow={2} fieldWidth={450} fieldHeight={35} /> :
                        (<Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} onReset={() => reset()} className="space-y-8">
                                <Layout gap={5}>
                                    <Layout stack width={450}>
                                        <DefaultTextInput
                                            name='name'
                                            label='Name'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                        <DefaultSelect
                                            name='branchId'
                                            label='Branch'
                                            isLoading={isBranchesLoading}
                                            options={branchesData?.branches}
                                            control={form.control}
                                            disabled={isViewPage}
                                        />
                                        <DefaultTextInput
                                            name='price'
                                            label='Price'
                                            type='number'
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
                                </Layout>
                                {!isViewPage && <FormFooter isSubmitting={isAddRoomTypePending || isUpdateRoomTypePending} />}
                            </form>
                        </Form>)}
            </CardContent>
        </Card>
    )
}

export default RoomTypeForm