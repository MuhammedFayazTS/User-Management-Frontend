export interface CustomerState {
    databaseId: number | null;
    isViewPage: boolean;
  }
  
  export interface CustomerActions {
    setDatabaseId: (id: number) => void;
    toggleViewPage: (view: boolean) => void;
    reset: () => void;
  }
  
  export type CustomerStore = CustomerState & CustomerActions;
  