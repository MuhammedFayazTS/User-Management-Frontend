import React, { useState } from "react"
import {
  Command,
} from "lucide-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useAuthContext } from "@/context/auth-provider"
import { Skeleton } from "../ui/skeleton"
import { SearchForm } from "../search-form"
import { NavSearchResults } from "./nav-search-results"
import { searchNavMain } from "@/utils/sidebar-helper"
import { data } from "@/constants/sidebar-items"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isLoading, user } = useAuthContext();
  const [searchedModules, setSearchedModules] = useState<{ title: string; url: string }[] | null>(null)

  const onsubmitsearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { searchQuery } = Object.fromEntries(formData.entries());

    const searchResult = searchNavMain(data, `${searchQuery}`)
    setSearchedModules(searchResult)
  };

  return (
    <Sidebar collapsible="icon" {...props}>

      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Nexus Flow</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* uncomment when team switcher is needed */}
        {/* <TeamSwitcher teams={data.teams} /> */}

      </SidebarHeader>

      <SearchForm onSubmit={onsubmitsearch} />

      <SidebarContent>
        {
          searchedModules && (
            <NavSearchResults items={searchedModules} />
          )
        }
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {isLoading ? (
          <div className="flex items-center space-x-2 mb-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-2 w-10/12" />
            </div>
          </div>
        ) : (<NavUser user={user} />
        )
        }
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
