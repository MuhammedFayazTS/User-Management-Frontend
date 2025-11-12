import { useEffect, useCallback, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInCalendarDays } from 'date-fns';
import { useParams } from 'react-router';
import { z } from 'zod';
import DefaultTextInput from '@/components/core/DefaultTextInput';
import { DefaultSelect } from '@/components/core/DefaultSelect';
import { Form } from '@/components/ui/form';
import { useAddBooking, useAddCheckIn, useGetBooking, useUpdateBooking } from '@/store/server/booking';
import { useGetBranchesForSelect } from '@/store/server/branch';
import { useGetCustomersForSelect } from '@/store/server/customer';
import { useGetRoom, useGetRoomsForSelect } from '@/store/server/room';
import { useBookingStore } from '@/store/client';
import Layout from '@/components/core/Layout';
import FormFooter from '@/components/core/FormFooter';
import { useHeaderContext } from '@/context/header-provider';
import { handleMutationError, handleSuccessResponse } from '@/utils/handleMutationResponse';
import { BaseApiResponse } from '@/types/common';
import { BookingStatus } from '@/types/booking';
import DefaultDateRangePicker from '@/components/core/DefaultDateRangePicker';
import DefaultDatePicker from '@/components/core/DefaultDatePicker';
import EditButton from '@/components/buttons/EditButton';
import SkeletonForm from '@/components/loaders/SkeletonForm';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { bookingSchema } from './schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';
import { titleMap } from '..';
import { useGetPaymentModesForSelect } from '@/store/server/payment';
import DefaultTextArea from '@/components/core/DefaultTextArea';

const today = new Date();
const afterOneDay = new Date(today);
afterOneDay.setDate(today.getDate() + 1);

const defaultValues = {
  roomId: undefined,
  customerId: undefined,
  branchId: undefined,
  bookingDuration: { from: today, to: afterOneDay },
  actualCheckIn: null,
  actualCheckOut: null,
  status: undefined as BookingStatus | undefined,
  totalAmount: 0,
  amountPaid: null,
  discount: null,
  tax: null,
  netAmount: 0,
  notes: null,
};

const BookingDetails = () => {
  const { roomId } = useParams();
  const numericRoomId = roomId ? +roomId : undefined;
  const status = useParams()?.type as BookingStatus;
  const { reset: resetDatabaseId, toggleViewPage, databaseId, isViewPage } = useBookingStore(state => state);
  const [isExpandedBookingDuration, setIsExpandedBookingDuration] = useState(false)
  const { mutate: addBooking, isPending: isAddPending } = useAddBooking();
  const { mutate: checkIn, isPending: isCheckInPending } = useAddCheckIn(numericRoomId);
  const { mutate: updateBooking, isPending: isUpdatePending } = useUpdateBooking();
  const { data: bookingData, isLoading } = useGetBooking(databaseId ?? undefined);
  const { data: branchesData, isLoading: isBranchesLoading } = useGetBranchesForSelect();
  const { data: customersData, isLoading: isCustomersLoading } = useGetCustomersForSelect();
  const { data: paymentModesData, isLoading: isPaymentModesLoading } = useGetPaymentModesForSelect();
  const { data: roomsData, isLoading: isRoomsLoading } = useGetRoomsForSelect();
  const { data: roomDetail, isLoading: isRoomLoading } = useGetRoom(roomId ? +roomId : undefined);
  const { setIsLoading } = useHeaderContext();

  const currentTitle =
    (status === BookingStatus.BOOKED && titleMap.isBooking) ||
    (status === BookingStatus.CHECKED_IN && titleMap.isCheckIn) ||
    (status === BookingStatus.CHECKED_OUT && titleMap.isCheckOut) ||
    (status === BookingStatus.CANCELLED && titleMap.isCancel) ||
    "Booking";

  const formSchema = bookingSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues, roomId: roomId ? +roomId : undefined },
  });

  const { reset, setValue, control, handleSubmit } = form;

  const watchBookingDuration = useWatch({
    control,
    name: 'bookingDuration',
  });

  const watchDiscount = useWatch({
    control,
    name: 'discount',
  }) ?? 0;

  const watchTax = useWatch({
    control,
    name: 'tax',
  }) ?? 0;

  const paymentModeId = useWatch({
    control,
    name: 'paymentModeId',
  });

  const numberOfDays = differenceInCalendarDays(
    watchBookingDuration?.to ?? afterOneDay,
    watchBookingDuration?.from ?? today
  );
  const roomBasePrice = +(roomDetail?.room?.type?.price ?? 0);

  const calculateTotal = useCallback(() => {
    if (!numberOfDays || !roomBasePrice) {
      setValue('totalAmount', 0);
      setValue('netAmount', 0);
      return;
    }
    const totalAmount = roomBasePrice * numberOfDays;
    const netAmount = totalAmount - +watchDiscount + +watchTax;
    setValue('totalAmount', totalAmount);
    setValue('netAmount', netAmount);
  }, [numberOfDays, roomBasePrice, watchDiscount, watchTax, setValue]);

  useEffect(() => {
    calculateTotal();
  }, [calculateTotal]);

  useEffect(() => {
    if (bookingData?.booking && !isLoading) {
      reset(bookingData.booking);
    } else if (!databaseId) {
      reset({ ...defaultValues, roomId: roomId ? +roomId : undefined });
    }
  }, [isLoading, bookingData, reset, databaseId, roomId]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    const updatedValues = {
      ...values,
      roomId: values.roomId || (roomId ? +roomId : undefined),
      checkInDate: values.bookingDuration.from,
      checkOutDate: values.bookingDuration.to,
      status,
      discount: +(values.discount ?? 0),
      tax: +(values.tax ?? 0),
    };

    const paymentAmount = +(values.paymentAmount ?? 0);
    const isPaymentIncluded = paymentAmount > 0 && values.paymentModeId;

    if (isPaymentIncluded) {
      updatedValues.paymentType =
        status === BookingStatus.CANCELLED
          ? "refund"
          : paymentAmount < +values.netAmount
            ? "advance"
            : "final";
    }

    const mutationConfig = {
      onSuccess: (res: BaseApiResponse) => handleSuccessResponse(true, res.message, () => {
        reset();
        setIsLoading(false);
      }),
      onError: (err: unknown) => handleMutationError(err, () => setIsLoading(false)),
    };

    if (!databaseId) {
      switch (status) {
        case BookingStatus.BOOKED:
          addBooking(updatedValues, mutationConfig);
          break;
        case BookingStatus.CHECKED_IN:
          checkIn(updatedValues, mutationConfig);
          break;

        default:
          break;
      }
    } else {
      updateBooking({ id: databaseId, data: updatedValues }, mutationConfig);
    }

    await resetDatabaseId();
  };

  const getRowWiseTotal = (amount = 0, quantity = 0) =>
    amount && quantity ? (amount * quantity).toFixed(2) : '0';

  const onClickEditButton = () => toggleViewPage(false);


  const onDateRangeChange = (from: Date | null, to: Date | null) => {
    setValue('bookingDuration', { from: from ?? today, to: to ?? afterOneDay });
  };

  const onExpandOrCollapseBookingDuration = () => setIsExpandedBookingDuration(prev => !prev);

  const Footer = () => (
    <Layout grid columns={2}>
      <DefaultTextInput
        name='totalAmount'
        label='Total Amount'
        control={control}
        inputClassName='bg-white dark:bg-neutral-600'
        readOnly />
      <DefaultTextInput
        name='tax'
        label='Tax'
        control={control}
        readOnly={isViewPage || status !== BookingStatus.BOOKED}
        inputClassName='bg-white dark:bg-neutral-600'
        onChangeCallback={calculateTotal} />
      <DefaultTextInput
        name='discount'
        label='Discount'
        control={control}
        readOnly={isViewPage || status !== BookingStatus.BOOKED}
        inputClassName='bg-white dark:bg-neutral-600'
        onChangeCallback={calculateTotal} />
      <DefaultTextInput
        name='netAmount'
        label='Net Amount'
        control={control}
        inputClassName='bg-white dark:bg-neutral-600'
        readOnly />
    </Layout>
  );

  const PriceTable = () => (
    <Table className='border dark:border-none'>
      <TableCaption>Price Breakdown</TableCaption>
      <TableHeader className='bg-emerald-600'>
        <TableRow>
          <TableHead className='text-white'>For</TableHead>
          <TableHead className='text-white'>Amount</TableHead>
          <TableHead className='text-white'>Number of Days</TableHead>
          <TableHead className='text-white'>Total Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isRoomLoading ? (
          <TableRow>
            {Array.from({ length: 4 }).map((_, i) => (
              <TableCell key={i}><Skeleton className='w-full h-8' /></TableCell>
            ))}
          </TableRow>
        ) : (
          <TableRow className='bg-gray-50 dark:bg-neutral-600'>
            <TableCell>{roomDetail?.room?.type?.name}</TableCell>
            <TableCell>{roomBasePrice}</TableCell>
            <TableCell>{numberOfDays}</TableCell>
            <TableCell>{getRowWiseTotal(roomBasePrice, numberOfDays)}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  const PaymentDetails = () => (
    <>
      <Layout>
        <DefaultSelect
          name='paymentModeId'
          label='Payment Mode'
          isLoading={isPaymentModesLoading}
          inputClassName='bg-white dark:bg-neutral-600'
          options={paymentModesData?.paymentModes}
          control={control}
          disabled={isViewPage} />
        <DefaultTextInput
          type='number'
          name='paymentAmount'
          label='Amount'
          inputClassName='bg-white dark:bg-neutral-600'
          control={control}
          readOnly={isViewPage} />
      </Layout>
      {paymentModeId && <DefaultTextArea
        name='paymentRemarks'
        label='Payment Remarks'
        inputClassName='bg-white dark:bg-neutral-600'
        control={form.control}
        readOnly={isViewPage}
      />}
    </>
  )

  return (
    <Card className={isLoading ? 'w-[650px]' : 'w-full'}>
      <CardHeader>
        <CardTitle>
          {databaseId ? 'Update' : 'New'} {" "} {currentTitle}
          {isViewPage && <EditButton customClass='ml-3' onClick={onClickEditButton} />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <SkeletonForm rows={3} fieldsPerRow={2} fieldWidth={450} fieldHeight={35} />
        ) : (
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} onReset={() => reset()} className='space-y-8'>
              <Layout grid columns={2} className='space-x-5'>
                <Layout stack gap={3} >
                  <Layout >
                    <DefaultSelect
                      name='branchId'
                      label='Branch'
                      isLoading={isBranchesLoading}
                      options={branchesData?.branches}
                      control={control}
                      disabled={isViewPage || status !== BookingStatus.BOOKED} />
                    <DefaultSelect
                      name='roomId'
                      label='Room'
                      isLoading={isRoomsLoading}
                      options={roomsData?.rooms}
                      control={control}
                      disabled />
                  </Layout>
                  <DefaultSelect
                    name='customerId'
                    label='Customer'
                    isLoading={isCustomersLoading}
                    options={customersData?.customers}
                    control={control}
                    disabled={isViewPage || status !== BookingStatus.BOOKED} />
                  {status === BookingStatus.BOOKED &&
                    <Layout vAlign='center'>
                      {isExpandedBookingDuration ?
                        <>
                          <DefaultDatePicker name='bookingDuration.from' control={control} withTime label='Check In' />
                          <DefaultDatePicker name='bookingDuration.to' control={control} withTime label='Check Out' />
                        </>
                        :
                        <DefaultDateRangePicker
                          name='bookingDuration'
                          control={control}
                          onChange={onDateRangeChange}
                          label='Booking Duration'
                          placeholder='Select Date Range'
                        />}
                      <Button
                        className='mt-8 ml-1'
                        type='button'
                        variant={isExpandedBookingDuration ? "default" : "outline"}
                        onClick={onExpandOrCollapseBookingDuration}>
                        <ArrowLeftRight />
                      </Button>
                    </Layout>
                  }
                  <DefaultTextArea
                    name='notes'
                    label='Notes'
                    control={form.control}
                    readOnly={isViewPage}
                  />
                </Layout>
                <Layout stack className='h-fit p-3 rounded border border-gray-300 bg-gray-100 dark:border-none dark:bg-neutral-800'>
                  <PriceTable />
                  <Footer />
                  <PaymentDetails />
                </Layout>
              </Layout>
              {!isViewPage && <FormFooter isSubmitting={isAddPending || isUpdatePending || isCheckInPending} />}
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingDetails;
