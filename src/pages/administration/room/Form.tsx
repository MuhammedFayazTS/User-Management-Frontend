import { useEffect } from 'react';
import DefaultTextInput from '@/components/core/DefaultTextInput'
import { roomSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useAddRoom, useGetRoom, useUpdateRoom } from '@/store/server/room';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/core/Layout';
import FormFooter from '@/components/core/FormFooter';
import { useHeaderContext } from '@/context/header-provider';
import { useRoomStore } from '@/store/client';
import SkeletonForm from '@/components/loaders/SkeletonForm';
import { handleMutationError, handleSuccessResponse } from '@/utils/handleMutationResponse';
import EditButton from '@/components/buttons/EditButton';
import { BaseApiResponse } from '@/types/common';
import { useGetBranchesForSelect } from '@/store/server/branch';
import { DefaultSelect } from '@/components/core/DefaultSelect';
import { useGetRoomTypesForSelect } from '@/store/server/room-type';
import { useGetRoomStatusesForSelect } from '@/store/server/room-status';

const defaultValues = {
    number: "",
    branchId: undefined,
    typeId: undefined,
    statusId: undefined
}

const RoomForm = () => {
    const { reset: resetDatabaseId, toggleViewPage, databaseId, isViewPage } = useRoomStore((state) => state);

    const { mutate: addRoomMutation, isPending: isAddRoomPending } = useAddRoom();
    const { mutate: updateRoomMutation, isPending: isUpdateRoomPending } = useUpdateRoom();

    const { data: roomData, isLoading } = useGetRoom(databaseId ?? undefined);
    const { data: branchesData, isLoading: isBranchesLoading } = useGetBranchesForSelect();
    const { data: roomTypesData, isLoading: isRoomTypesLoading } = useGetRoomTypesForSelect();
    const { data: roomStatusesData, isLoading: isRoomStatusesLoading } = useGetRoomStatusesForSelect();

    const { setIsLoading } = useHeaderContext()
    const formSchema = roomSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const { reset } = form;

    useEffect(() => {
        if (!isLoading && roomData?.room) {
            reset(roomData.room);
        }
        if (!databaseId) {
            reset(defaultValues)
        }
    }, [isLoading, roomData, reset, databaseId]);

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
            addRoomMutation(updatedValues, mutationConfig);
        } else {
            updateRoomMutation({ id: databaseId, data: updatedValues }, mutationConfig);
        }
        await resetDatabaseId()
    };

    const onClickEditButton = () => toggleViewPage(false)

    return (
        <Card className={isLoading ? 'w-[650px]' : 'w-full'}>
            <CardHeader>
                <CardTitle>
                    {databaseId ? 'Update' : 'Create'} Room
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
                                            name='number'
                                            label='Number'
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
                                        <DefaultSelect
                                            name='typeId'
                                            label='Type'
                                            isLoading={isRoomTypesLoading}
                                            options={roomTypesData?.roomTypes}
                                            control={form.control}
                                            disabled={isViewPage}
                                        />
                                        <DefaultSelect
                                            name='statusId'
                                            label='Status'
                                            isLoading={isRoomStatusesLoading}
                                            options={roomStatusesData?.roomStatuses}
                                            control={form.control}
                                            disabled={isViewPage}
                                        />
                                    </Layout>
                                </Layout>
                                {!isViewPage && <FormFooter isSubmitting={isAddRoomPending || isUpdateRoomPending} />}
                            </form>
                        </Form>)}
            </CardContent>
        </Card>
    )
}

export default RoomForm