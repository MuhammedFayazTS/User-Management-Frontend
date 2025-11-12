import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useHeaderContext } from "@/context/header-provider";
import { Separator } from "./ui/separator";
import { CalendarCheck, HandCoins, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const Header = () => {
  const { breadcrumbs, isLoading } = useHeaderContext()
  const navigate = useNavigate()

  return (
    <div className="w-full bg-gray-300 dark:bg-gray-950">
      <div className="flex justify-between h-[60px] items-center border-b border-[#00002f26] px-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList key={'breadcrumb'}>
              {
                isLoading ?
                  (
                    <BreadcrumbItem key={'loading'}>
                      <BreadcrumbPage>
                        <Loader2 className="animate-spin" />
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  ) :
                  breadcrumbs?.map((breadcrumb, index) => (<>
                    <BreadcrumbItem key={breadcrumb.title + index} className="hidden md:block">
                      <BreadcrumbLink href={breadcrumb.to ?? "#"}>
                        {breadcrumb.title}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {breadcrumb.isSeparator && <BreadcrumbSeparator key={breadcrumb.title} className="hidden md:block" />
                    }
                  </>))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex gap-x-2">
          <TooltipProvider key={"Booking"}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  onClick={() => navigate("/booking/create")}
                  className="bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-600">
                  <CalendarCheck />
                </Button>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
          <Button
            type="button"
            onClick={() => navigate("/booking/create")}
            className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-600">
            <HandCoins />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;