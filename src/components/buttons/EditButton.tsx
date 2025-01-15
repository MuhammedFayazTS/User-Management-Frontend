import { Edit } from "lucide-react"
import { FC } from "react"
import { Button } from "../ui/button"

type EditButtonProps = {
    withIcon?: boolean
    onClick?: () => void,
    customClass?: string
}

const EditButton: FC<EditButtonProps> = ({ withIcon = true, onClick, customClass }) => {
    
    return (
        <Button
            type="button"
            onClick={onClick}
            className={`${customClass} 
                bg-green-500 text-white hover:bg-green-600 focus:ring-1 focus:ring-green-300 rounded-lg shadow-md 
                dark:bg-green-700 dark:text-white dark:hover:bg-green-600 dark:focus:ring-green-400 dark:shadow-lg`}
        >
            {withIcon && <Edit className="mr-2" />}
            Edit
        </Button>
    )
}

export default EditButton
