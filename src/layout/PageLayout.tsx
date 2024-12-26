import PageHeader from "@/components/PageHeader"
import useBreadcrumbs from "@/hooks/use-breadcrumbs"
import { LucideIcon } from "lucide-react"

export type PageType = 'create' | 'list' | 'edit'

interface IBreadcrumb {
    title: string
    isSeparator?: boolean
}

export interface IAction {
    title?: string
    onClick: (event: Event) => void
    disabled?: boolean
    loading?: boolean
    Icon: LucideIcon
}

interface IPage {
    title: string
    parentModules?: IBreadcrumb[] | undefined,
    breadcrumbsTitle?: string
    children: React.ReactNode,
    className?: string
    actions?: IAction[]
}

function Page({ title, className, actions, parentModules, breadcrumbsTitle, children }: IPage) {
    useBreadcrumbs({ title: breadcrumbsTitle || title, parentModules });
    return (
        <div className={`p-5 ${className}`}>
            <PageHeader title={title} actions={actions} />
            {children}
        </div>
    )
}

export default Page