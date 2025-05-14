import Page, { PageType } from '@/layout/PageLayout'
import { getParentModuleBreadcrumb, ParentModules } from '@/utils/breadcrumb-modules-helper'
import Form from './Form'
import { isForm } from '@/utils/common-helper'
import { useState } from 'react'
import { getFormActions } from '@/utils/actions'
import List from './List'
import { useRoomTypeStore } from '@/store/client'

const RoomType = () => {
    const [view, setView] = useState<PageType>('create')
    const resetDatabaseId = useRoomTypeStore((state) => state.reset);

    const togglePage = (page: PageType) => {
        setView(page)

        if(page !== 'edit'){
            resetDatabaseId()
        }
    }

    const actions = getFormActions({
        view,
        onCreate: () => togglePage('create'),
        onList: () => togglePage('list'),
    })
    
    return (
        <Page
            title={'Room Type'}
            parentModules={getParentModuleBreadcrumb(ParentModules.ADMINISTRATION)}
            actions={actions}
        >
            {isForm(view) && <Form/>}
            {view === 'list' && <List togglePage={togglePage} />}
        </Page>
    )
}

export default RoomType