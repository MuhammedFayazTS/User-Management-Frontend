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

const Header = () => {
  const { breadcrumbs, isLoading } = useHeaderContext()

  return (
    <div className="w-full">
      <div className="flex h-[60px] items-center border-b border-[#00002f26] px-2">
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
                        Loading...
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
      </div>
    </div>
  );
};

export default Header;