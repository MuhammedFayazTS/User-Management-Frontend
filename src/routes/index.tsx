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
import Home from '@/pages/home/Index'
import Settings from '@/pages/Settings/Index'
import Session from '@/pages/account/sessions/Index'
import VerifyMfa from '@/pages/auth/verify-mfa/Index'
import MFA from '@/pages/account/mfa/Index'

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
                    <Route path="verify-mfa" element={<VerifyMfa />} />
                </Route>
            </Route>

            {/* private routes */}
            <Route element={<AuthRoute />}>
                <Route element={<AppLayout />}>
                    <Route path="home" element={<Home/>} />
                    <Route path="settings" element={<Settings/>} />
                    <Route path="sessions" element={<Session/>} />
                    <Route path="mfa" element={<MFA/>} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes