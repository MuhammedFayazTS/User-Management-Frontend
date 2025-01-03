import { Button } from "./ui/button"
import { IAction } from "@/layout/PageLayout"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
interface IPageHeader {
    title: string,
    withoutTitle?: boolean,
    actions?: IAction[],
}

function PageHeader({ title, actions, withoutTitle = true }: IPageHeader) {
    return (
        <>
            <div className={`flex justify-between mb-4`}>
                <h1 className="text-2xl font-bold">{title}</h1>

                {actions && actions.length ? (
                    <div className="flex gap-2">
                        {actions.map(({ title, Icon, disabled, active, onClick }) => {
                            return (
                                <TooltipProvider key={title}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant={active ? "default" : "secondary"}
                                                size={withoutTitle ? "icon" : "default"}
                                                disabled={disabled}
                                                onClick={onClick}
                                            >
                                                {Icon && <Icon className="w-5 h-5" />}
                                                {!withoutTitle && title}
                                            </Button>
                                        </TooltipTrigger>
                                        {withoutTitle && <TooltipContent>
                                            <p>{title}</p>
                                        </TooltipContent>}
                                    </Tooltip>
                                </TooltipProvider>
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