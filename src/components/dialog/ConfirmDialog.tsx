import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { LucideIcon, Save } from "lucide-react";

export interface IConfirmDialog {
    isOpen: boolean;
    TitleIcon?: LucideIcon
    title: string;
    subTitle?: string;
    onConfirm: () => void;
}

interface ConfirmBoxInterface {
    confirmDialog?: IConfirmDialog
    setConfirmDialog: React.Dispatch<React.SetStateAction<IConfirmDialog | undefined>>
}


const ConfirmDialog: FC<ConfirmBoxInterface> = ({ confirmDialog, setConfirmDialog }) => {
    if (!confirmDialog) return;
    const { isOpen, title, TitleIcon, subTitle = "You may not be able to revert the action!", onConfirm } = confirmDialog;

    const handleClose = () => {
        setConfirmDialog({ ...confirmDialog, isOpen: false })
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {TitleIcon && <TitleIcon />}
                            {title}
                        </DialogTitle>
                        <DialogDescription>
                            {subTitle}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button type="button" variant={"ghost"} onClick={handleClose}>
                            No
                        </Button>
                        <Button type="button" onClick={onConfirm}>
                            <Save />
                            Yes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ConfirmDialog;