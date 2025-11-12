export interface BranchState {
    databaseId: number | null;
    isViewPage: boolean;
  }
  
  export interface BranchActions {
    setDatabaseId: (id: number) => void;
    toggleViewPage: (view: boolean) => void;
    reset: () => void;
  }
  
  export type BranchStore = BranchState & BranchActions;
  