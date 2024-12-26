import { IBreadcrumb } from "@/context/header-provider";

export enum ParentModules {
  ACCOUNT = "ACCOUNT",
  SETTINGS = "SETTINGS",
  ADMINISTRATION = "ADMINISTRATION",
}

export const getParentModuleBreadcrumb = (module: ParentModules): IBreadcrumb[] | undefined => {
  const breadcrumb: IBreadcrumb = {
    title: "",
    isSeparator: true,
    to: "#",
  };

  switch (module) {
    case ParentModules.ACCOUNT:
      breadcrumb.title = "Account";
      return [breadcrumb];
    case ParentModules.SETTINGS:
      breadcrumb.title = "Settings";
      return [breadcrumb];
    case ParentModules.ADMINISTRATION:
      breadcrumb.title = "Admin";
      return [breadcrumb];
    default:
      return undefined;
  }
};
