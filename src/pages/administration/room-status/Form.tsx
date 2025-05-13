import { useEffect } from 'react';
import DefaultTextInput from '@/components/core/DefaultTextInput'
import { roomStatusSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useAddRoomStatus, useGetRoomStatus, useUpdateRoomStatus } from '@/store/server/room-status';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/core/Layout';
import DefaultTextArea from '@/components/core/DefaultTextArea';
import FormFooter from '@/components/core/FormFooter';
import { useHeaderContext } from '@/context/header-provider';
import { useRoomStatusStore } from '@/store/client';
import SkeletonForm from '@/components/loaders/SkeletonForm';
import { handleMutationError, handleSuccessResponse } from '@/utils/handleMutationResponse';
import EditButton from '@/components/buttons/EditButton';
import { BaseApiResponse } from '@/types/common';

const defaultValues = {
    name: "",
}

const RoomStatusForm = () => {
    const { reset: resetDatabaseId, toggleViewPage, databaseId, isViewPage } = useRoomStatusStore((state) => state);

    const { mutate: addRoomStatusMutation, isPending: isAddRoomStatusPending } = useAddRoomStatus();
    const { mutate: updateRoomStatusMutation, isPending: isUpdateRoomStatusPending } = useUpdateRoomStatus();

    const { data: roomStatusData, isLoading } = useGetRoomStatus(databaseId ?? undefined);

    const { setIsLoading } = useHeaderContext()
    const formSchema = roomStatusSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const { reset } = form;

    useEffect(() => {
        if (!isLoading && roomStatusData?.roomStatus) {
            reset(roomStatusData.roomStatus);
        }
        if (!databaseId) {
            reset(defaultValues)
        }
    }, [isLoading, roomStatusData, reset, databaseId]);

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
            addRoomStatusMutation(updatedValues, mutationConfig);
        } else {
            updateRoomStatusMutation({ id: databaseId, data: updatedValues }, mutationConfig);
        }
        await resetDatabaseId()
    };

    const onClickEditButton = () => toggleViewPage(false)

    return (
        <Card className={isLoading ? 'w-[650px]' : 'w-full'}>
            <CardHeader>
                <CardTitle>
                    {databaseId ? 'Update' : 'Create'} Room Status
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
                                        <DefaultTextArea
                                            name='description'
                                            label='Description'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                    </Layout>
                                </Layout>
                                {!isViewPage && <FormFooter isSubmitting={isAddRoomStatusPending || isUpdateRoomStatusPending} />}
                            </form>
                        </Form>)}
            </CardContent>
        </Card>
    )
}

export default RoomStatusForm