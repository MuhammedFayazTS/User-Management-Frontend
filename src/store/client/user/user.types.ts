export interface UserState {
    databaseId: number | null;
    isViewPage: boolean;
  }
  
  export interface UserActions {
    setDatabaseId: (id: number) => void;
    toggleViewPage: (view: boolean) => void;
    reset: () => void;
  }
  
  export type UserStore = UserState & UserActions;
  