import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "./ui/badge";
import { Permission } from "@/types/permission";
import { FC, useRef, useState, useEffect } from "react";
import { Portal } from "@radix-ui/react-hover-card";
import Layout from "./core/Layout";

interface IPermissionBadgeProps {
    maxWidth?: number;
    permissions?: Permission[];
}

const PermissionBadge: FC<IPermissionBadgeProps> = ({ maxWidth = 200, permissions = [] }) => {
    const [visiblePermissions, setVisiblePermissions] = useState<Permission[]>([]);
    const [hiddenPermissions, setHiddenPermissions] = useState<Permission[]>([]);
    const layoutRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!maxWidth || !permissions.length) return;

        let totalWidth = 0;
        const visible: Permission[] = [];
        const hidden: Permission[] = [];
        const tempContainer = document.createElement("div");

        // Add temporary container to calculate badge widths
        document.body.appendChild(tempContainer);
        tempContainer.style.position = "absolute";
        tempContainer.style.visibility = "hidden";
        tempContainer.style.whiteSpace = "nowrap";

        for (const permission of permissions) {
            const badge = document.createElement("span");
            badge.className = "badge p-1 z-0";
            badge.innerText = permission.name;
            tempContainer.appendChild(badge);

            const badgeWidth = badge.offsetWidth + 8;
            if (totalWidth + badgeWidth <= maxWidth) {
                visible.push(permission);
                totalWidth += badgeWidth;
            } else {
                hidden.push(permission);
            }
        }

        setVisiblePermissions(visible);
        setHiddenPermissions(hidden);

        // Cleanup temporary container
        document.body.removeChild(tempContainer);
    }, [permissions, maxWidth]);

    return (
        <div className="flex gap-1" ref={layoutRef}>
            {permissions.length > 0 ? (
                <>
                    {visiblePermissions.map((permission) => (
                        <Badge variant="secondary" className="p-1 z-0 cursor-pointer" key={permission.name}>
                            {permission.name}
                        </Badge>
                    ))}
                    {hiddenPermissions.length > 0 && (
                        <HoverCard>
                            <HoverCardTrigger>
                                <Badge variant="secondary" className="p-1 z-0 cursor-pointer">
                                    more+
                                </Badge>
                            </HoverCardTrigger>
                            <Portal>
                                <HoverCardContent>
                                    <Layout gap={1} className="flex-wrap">
                                        {hiddenPermissions.map((permission) => (
                                            <Badge variant={'secondary'} className="p-1" key={permission.name}>{permission.name}</Badge>
                                        ))}
                                    </Layout>
                                </HoverCardContent>
                            </Portal>
                        </HoverCard>
                    )}
                </>
            ) : (
                <Badge variant="outline" className="p-1 z-0 cursor-pointer">
                    none
                </Badge>
            )}
        </div>
    );
};

export default PermissionBadge;
