export interface RoleState {
    databaseId: number | null;
    isViewPage: boolean;
  }
  
  export interface RoleActions {
    setDatabaseId: (id: number) => void;
    toggleViewPage: (view: boolean) => void;
    reset: () => void;
  }
  
  export type RoleStore = RoleState & RoleActions;
  