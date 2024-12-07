import { AppLayout } from '@/layout/AppLayout'
import BaseLayout from '@/layout/BaseLayout'
import { Route, Routes } from 'react-router'

const AppRoutes = () => {
    return (
        <Routes>
            {/* public routes */}
            <Route element={<BaseLayout />}>
                <Route path="" element={<></>} />
            </Route>

            {/* private routes */}
            <Route element={<AppLayout />}>
                <Route path="home" element={<></>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes