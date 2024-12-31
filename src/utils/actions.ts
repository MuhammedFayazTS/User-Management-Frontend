import { IAction } from "@/components/core/table/Actions";
import { PageType, IAction as IPageAction } from "@/layout/PageLayout";
import { Edit, Eye, List, PenBox, Trash } from "lucide-react";

interface FormActions {
  onCreate?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onList?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  view: PageType;
}

interface ListActions {
  onEdit?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  onDelete?: (event: React.MouseEvent<Element, MouseEvent>) => void;
  onView?: (event: React.MouseEvent<Element, MouseEvent>) => void;
}

export const getFormActions = ({ onCreate, onList, view }: FormActions) => {
  const actions: IPageAction[] = [];

  if (onCreate) {
    actions.push({
      title: "Create",
      Icon: PenBox,
      active: view === "create",
      onClick: onCreate,
    });
  }

  if (onList) {
    actions.push({
      title: "List",
      Icon: List,
      active: view === "list",
      onClick: onList,
    });
  }

  return actions;
};

export const getListActions = ({ onEdit, onDelete, onView }: ListActions) => {
  const actions: IAction[] = [];
  if (onView) {
    actions.push({
      title: "view",
      Icon: Eye,
      variant: "outline",
      onClick: onView,
    });
  }

  if (onEdit) {
    actions.push({
      title: "Edit",
      Icon: Edit,
      variant: "secondary",
      onClick: onEdit,
    });
  }

  if (onDelete) {
    actions.push({
      title: "Delete",
      Icon: Trash,
      variant: "destructive",
      onClick: onDelete,
    });
  }

  return actions;
};
