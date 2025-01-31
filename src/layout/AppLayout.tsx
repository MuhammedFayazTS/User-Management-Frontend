import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import Header from "@/components/Header"
import { Outlet } from "react-router"
import { AuthProvider } from "@/context/auth-provider"
import { HeaderProvider } from "@/context/header-provider"

export const AppLayout = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <HeaderProvider>
              <main className="w-full md:min-h-full-minus-60">
                <Header />
                <Outlet />
              </main>
          </HeaderProvider>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  )
}
