export interface GroupState {
  databaseId: number | null;
  isViewPage: boolean;
}

export interface GroupActions {
  setDatabaseId: (id: number) => void;
  toggleViewPage: (view: boolean) => void;
  reset: () => void;
}

export type GroupStore = GroupState & GroupActions;
