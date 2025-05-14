import { useEffect } from 'react';
import DefaultTextInput from '@/components/core/DefaultTextInput'
import { customerSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useAddCustomer, useGetCustomer, useUpdateCustomer } from '@/store/server/customer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Layout from '@/components/core/Layout';
import FormFooter from '@/components/core/FormFooter';
import { useHeaderContext } from '@/context/header-provider';
import { useCustomerStore } from '@/store/client';
import SkeletonForm from '@/components/loaders/SkeletonForm';
import { handleMutationError, handleSuccessResponse } from '@/utils/handleMutationResponse';
import EditButton from '@/components/buttons/EditButton';
import { BaseApiResponse } from '@/types/common';
import { DefaultSelect } from '@/components/core/DefaultSelect';
import { useGetCountriesForSelect } from '@/store/server/country';
import DefaultTextArea from '@/components/core/DefaultTextArea';

const defaultValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    countryId: undefined,
}

const CustomerForm = () => {
    const { reset: resetDatabaseId, toggleViewPage, databaseId, isViewPage } = useCustomerStore((state) => state);

    const { mutate: addCustomerMutation, isPending: isAddCustomerPending } = useAddCustomer();
    const { mutate: updateCustomerMutation, isPending: isUpdateCustomerPending } = useUpdateCustomer();

    const { data: customerData, isLoading } = useGetCustomer(databaseId ?? undefined);
    const { data: countriesData, isLoading: isCountriesLoading } = useGetCountriesForSelect();

    const { setIsLoading } = useHeaderContext()
    const formSchema = customerSchema()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const { reset } = form;

    useEffect(() => {
        if (!isLoading && customerData?.customer) {
            reset(customerData.customer);
        }
        if (!databaseId) {
            reset(defaultValues)
        }
    }, [isLoading, customerData, reset, databaseId]);

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
            addCustomerMutation(updatedValues, mutationConfig);
        } else {
            updateCustomerMutation({ id: databaseId, data: updatedValues }, mutationConfig);
        }
        await resetDatabaseId()
    };

    const onClickEditButton = () => toggleViewPage(false)

    return (
        <Card className={isLoading ? 'w-[650px]' : 'w-full'}>
            <CardHeader>
                <CardTitle>
                    {databaseId ? 'Update' : 'Create'} Customer
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
                                            name='firstName'
                                            label='First Name'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                        <DefaultTextInput
                                            name='phone'
                                            label='Phone'
                                            type='number'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                        <DefaultTextInput
                                            name='city'
                                            label='City'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                        <DefaultTextArea
                                            name='address'
                                            label='Address'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                    </Layout>
                                    <Layout stack width={450}>
                                        <DefaultTextInput
                                            name='lastName'
                                            label='Last Name'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                        <DefaultTextInput
                                            name='email'
                                            label='Email'
                                            type='email'
                                            control={form.control}
                                            readOnly={isViewPage}
                                        />
                                        <DefaultSelect
                                            name='countryId'
                                            label='Country'
                                            isLoading={isCountriesLoading}
                                            options={countriesData?.countries}
                                            control={form.control}
                                            disabled={isViewPage}
                                        />

                                    </Layout>
                                </Layout>
                                {!isViewPage && <FormFooter isSubmitting={isAddCustomerPending || isUpdateCustomerPending} />}
                            </form>
                        </Form>)}
            </CardContent>
        </Card>
    )
}

export default CustomerForm