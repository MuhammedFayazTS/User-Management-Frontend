import { IAction, PageType } from "@/layout/PageLayout";
import { List, PenBox } from "lucide-react";

interface FormActions {
  onCreate?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onList?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  view: PageType;
}

export const getFormActions = ({ onCreate, onList, view }: FormActions) => {
  const actions: IAction[] = [];

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
