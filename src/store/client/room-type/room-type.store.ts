import { create } from 'zustand';
import { RoomStatusStore } from './room-type.types';

const useRoomStatusStore = create<RoomStatusStore>((set) => ({
  databaseId: null,
  isViewPage: false,
  setDatabaseId: (id: number) => set(() => ({ databaseId: id })),
  toggleViewPage: (view: boolean) => set(() => ({ isViewPage: view })),
  reset: () => set(() => ({ databaseId: null,isViewPage:false })),
}));

export default useRoomStatusStore;
