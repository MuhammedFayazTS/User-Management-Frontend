export interface BookingState {
    databaseId: number | null;
    isViewPage: boolean;
  }
  
  export interface BookingActions {
    setDatabaseId: (id: number) => void;
    toggleViewPage: (view: boolean) => void;
    reset: () => void;
  }
  
  export type BookingStore = BookingState & BookingActions;
  