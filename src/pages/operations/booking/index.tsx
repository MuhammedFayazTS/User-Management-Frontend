import Page, { PageType } from '@/layout/PageLayout'
import { getParentModuleBreadcrumb, ParentModules } from '@/utils/breadcrumb-modules-helper'
import { getFormActions } from '@/utils/actions'
import { Outlet, useLocation, useNavigate } from 'react-router'

export const titleMap = {
    isBooking: "Booking",
    isCheckIn: "Check In",
    isCheckOut: "Check Out",
    isCancel: "Cancel",
}

const Booking = () => {
    const navigate = useNavigate()
    const path = useLocation()?.pathname
    const isBooking = path.includes("booked")
    const isCheckIn = path.includes("checked-in")
    const isCheckOut = path.includes("checked-out")
    const isCancel = path.includes("cancelled")
    // const resetDatabaseId = useBookingStore((state) => state.reset);

    const togglePage = (page: PageType) => {
        navigate(`/booking/${page}`)
    }

    const actions = getFormActions({
        view: "create",
        onCreate: () => togglePage('create'),
        onList: () => togglePage('list'),
    })

    const currentTitle =
        (isBooking && titleMap.isBooking) ||
        (isCheckIn && titleMap.isCheckIn) ||
        (isCheckOut && titleMap.isCheckOut) ||
        (isCancel && titleMap.isCancel) ||
        "Booking";

    return (
        <Page
            title={currentTitle}
            parentModules={getParentModuleBreadcrumb(ParentModules.ADMINISTRATION)}
            actions={actions}
        >
            <Outlet />
        </Page>
    )
}

export default Booking