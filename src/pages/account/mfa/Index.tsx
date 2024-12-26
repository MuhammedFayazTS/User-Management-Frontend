import EnableMfa from "@/components/EnableMfa";
import Page from "@/layout/PageLayout";
import { getParentModuleBreadcrumb, ParentModules } from "@/utils/breadcrumb-modules-helper";

const MFA = () => {
  return (<Page
    title="Two Factor Authentication"
    breadcrumbsTitle="2FA"
    className="via-root to-root rounded-xl bg-gradient-to-r p-6"
    parentModules={getParentModuleBreadcrumb(ParentModules.ACCOUNT)}
  >
    <EnableMfa />
  </Page>)
};

export default MFA;