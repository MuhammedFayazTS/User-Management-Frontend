import { ReactNode } from "react"
import Layout from "./Layout"
import { Button } from "../ui/button"
import { Loader2, RotateCcw, Save } from "lucide-react"

interface IFormFooterProps {
    children?: ReactNode
    withIcon?: boolean
    isSubmitting?: boolean
}

const FormFooter = ({ isSubmitting = false, withIcon = true, children }: IFormFooterProps) => {
    return (
        <Layout gap={2}>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="animate-spin" /> : (
                    withIcon ? <Save /> : <></>
                )}
                Submit
            </Button>
            <Button variant={"secondary"} type="reset" disabled={isSubmitting}>
                {withIcon ? <RotateCcw /> : <></>}
                Reset
            </Button>
            {children}
        </Layout>
    )
}

export default FormFooter