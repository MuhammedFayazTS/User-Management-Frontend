import { AppLayout } from '@/layout/AppLayout'
import { Route, Routes } from 'react-router'

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="home" element={<></>} />
            </Route>
        </Routes>
    )
}

export default AppRoutes