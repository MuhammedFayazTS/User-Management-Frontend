export interface RoleState {
    databaseId: number | null;
  }
  
  export interface RoleActions {
    setDatabaseId: (id: number) => void;
    reset: () => void;
  }
  
  export type RoleStore = RoleState & RoleActions;
  