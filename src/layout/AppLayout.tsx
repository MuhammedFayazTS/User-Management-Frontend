import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import Header from "@/components/Header"
import { Outlet } from "react-router"
import { AuthProvider } from "@/context/auth-provider"

export const AppLayout = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="w-full">
            <Header />
            <Outlet />
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  )
}
