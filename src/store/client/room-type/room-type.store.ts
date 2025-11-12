import { create } from 'zustand';
import { RoomTypeStore } from './room-type.types';

const useRoomTypeStore = create<RoomTypeStore>((set) => ({
  databaseId: null,
  isViewPage: false,
  setDatabaseId: (id: number) => set(() => ({ databaseId: id })),
  toggleViewPage: (view: boolean) => set(() => ({ isViewPage: view })),
  reset: () => set(() => ({ databaseId: null,isViewPage:false })),
}));

export default useRoomTypeStore;
