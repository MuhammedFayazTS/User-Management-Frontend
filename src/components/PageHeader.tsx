import { Button } from "./ui/button"
import { IAction } from "@/layout/PageLayout"
import Layout from "./core/Layout"

interface IPageHeader {
    title: string,
    actions?: IAction[]
}

function PageHeader({ title, actions }: IPageHeader) {
    return (
        <>
            <div className={`flex justify-between mb-4`}>
                <h1 className="text-2xl font-bold">{title}</h1>

                {actions && actions.length ? (
                    <div className="flex gap-2">
                        {actions.map(({ title, Icon, disabled }) => {
                            return (
                                <Button variant="default" size="icon" disabled={disabled}>
                                    <Layout gap={1}>
                                        {Icon && <Icon className="w-5 h-5" />}
                                        {title}
                                    </Layout>
                                </Button>
                            )
                        })}
                    </div>
                ) :
                    <></>
                }
            </div>
        </>
    )
}

export default PageHeader