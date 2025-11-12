import { create } from 'zustand';
import { BranchStore } from './branch.types';

const useBranchStore = create<BranchStore>((set) => ({
  databaseId: null,
  isViewPage: false,
  setDatabaseId: (id: number) => set(() => ({ databaseId: id })),
  toggleViewPage: (view: boolean) => set(() => ({ isViewPage: view })),
  reset: () => set(() => ({ databaseId: null,isViewPage:false })),
}));

export default useBranchStore;
