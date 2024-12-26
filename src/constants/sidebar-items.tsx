import { Settings2, UserCog, UserSquare } from "lucide-react";

export const data = {
  navMain: [
    {
      title: "Admin",
      url: "#",
      icon: UserSquare,
      items: [
        {
          title: "Role",
          url: "/admin/role",
        },
      ],
    },
    {
      title: "Account",
      url: "#",
      icon: UserCog,
      items: [
        {
          title: "Sessions",
          url: "/sessions",
        },
        {
          title: "2FA",
          url: "/mfa",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
};