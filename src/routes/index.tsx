import { AppLayout } from '@/layout/AppLayout'
import BaseLayout from '@/layout/BaseLayout'
import { Route, Routes } from 'react-router'
import Register from '@/pages/auth/register/Index'
import Login from '@/pages/auth/login/Index'
import ConfirmAccount from '@/pages/auth/confirm-account/Index'
import ForgotPassword from '@/pages/auth/forgot-password/Index'
import ResetPassword from '@/pages/auth/reset-password/Index'
import PublicRoute from './public.route'
import AuthRoute from './auth.route'

const AppRoutes = () => {
    return (
        <Routes>
            {/* public routes */}
            <Route element={<PublicRoute />}>
                <Route element={<BaseLayout />}>
                    <Route path="" element={<Login />} />
                    <Route path="signup" element={<Register />} />
                    <Route path="confirm-account" element={<ConfirmAccount />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="reset-password" element={<ResetPassword />} />
                </Route>
            </Route>

            {/* private routes */}
            <Route element={<AuthRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="home" element={<></>} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes