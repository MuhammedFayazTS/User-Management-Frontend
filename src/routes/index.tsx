import { AppLayout } from '@/layout/AppLayout'
import BaseLayout from '@/layout/BaseLayout'
import { Route, Routes } from 'react-router'
import Register from '@/pages/auth/register/Index'
import Login from '@/pages/auth/login/Index'
import ConfirmAccount from '@/pages/auth/confirm-account/Index'

const AppRoutes = () => {
    return (
        <Routes>
            {/* public routes */}
            <Route element={<BaseLayout />}>
                <Route path="" element={<Login />} />
                <Route path="signup" element={<Register />} />
                <Route path="confirm-account" element={<ConfirmAccount />} />
            </Route>

            {/* private routes */}
            <Route element={<AppLayout />}>
                <Route path="home" element={<></>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes