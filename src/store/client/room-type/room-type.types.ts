export interface RoomTypeState {
    databaseId: number | null;
    isViewPage: boolean;
  }
  
  export interface RoomTypeActions {
    setDatabaseId: (id: number) => void;
    toggleViewPage: (view: boolean) => void;
    reset: () => void;
  }
  
  export type RoomTypeStore = RoomTypeState & RoomTypeActions;
  