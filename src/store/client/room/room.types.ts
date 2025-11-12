export interface RoomState {
    databaseId: number | null;
    isViewPage: boolean;
  }
  
  export interface RoomActions {
    setDatabaseId: (id: number) => void;
    toggleViewPage: (view: boolean) => void;
    reset: () => void;
  }
  
  export type RoomStore = RoomState & RoomActions;
  