import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavSearchResults({
    items,
}: {
    items: {
        title: string;
        url: string;
        subItems?: { title: string; url: string }[];
    }[];
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>{items.length > 0 ? 'Search Results' : 'No Results'}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item, index) => (
                    <SidebarMenuItem key={index}>
                        {item.subItems && item.subItems.length > 0 ? (
                            <SidebarMenuSub>
                                <SidebarMenuSubButton asChild>
                                    <a href={item.url}>
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuSubButton>
                                {item.subItems.map((subItem, subIndex) => (
                                    <SidebarMenuSubItem key={subIndex}>
                                        <SidebarMenuSubButton asChild>
                                            <a href={subItem.url}>
                                                <span>{subItem.title}</span>
                                            </a>
                                        </SidebarMenuSubButton>
                                    </SidebarMenuSubItem>
                                ))}
                            </SidebarMenuSub>
                        ) : (
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
