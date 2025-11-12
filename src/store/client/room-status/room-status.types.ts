export interface RoomStatusState {
    databaseId: number | null;
    isViewPage: boolean;
  }
  
  export interface RoomStatusActions {
    setDatabaseId: (id: number) => void;
    toggleViewPage: (view: boolean) => void;
    reset: () => void;
  }
  
  export type RoomStatusStore = RoomStatusState & RoomStatusActions;
  