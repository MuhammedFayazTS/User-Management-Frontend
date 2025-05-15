import Page, { PageType } from '@/layout/PageLayout'
import { getParentModuleBreadcrumb, ParentModules } from '@/utils/breadcrumb-modules-helper'
import { getFormActions } from '@/utils/actions'
import { Outlet, useNavigate } from 'react-router'

const Booking = () => {
    const navigate = useNavigate()
    // const resetDatabaseId = useBookingStore((state) => state.reset);

    const togglePage = (page: PageType) => {
        navigate(`/booking/${page}`)
    }

    const actions = getFormActions({
        view: "create",
        onCreate: () => togglePage('create'),
        onList: () => togglePage('list'),
    })

    return (
        <Page
            title={'Booking'}
            parentModules={getParentModuleBreadcrumb(ParentModules.ADMINISTRATION)}
            actions={actions}
        >
            <Outlet />
        </Page>
    )
}

export default Booking