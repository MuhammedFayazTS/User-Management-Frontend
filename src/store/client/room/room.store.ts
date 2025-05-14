import { create } from 'zustand';
import { RoomStore } from './room.types';

const useRoomStore = create<RoomStore>((set) => ({
  databaseId: null,
  isViewPage: false,
  setDatabaseId: (id: number) => set(() => ({ databaseId: id })),
  toggleViewPage: (view: boolean) => set(() => ({ isViewPage: view })),
  reset: () => set(() => ({ databaseId: null,isViewPage:false })),
}));

export default useRoomStore;
