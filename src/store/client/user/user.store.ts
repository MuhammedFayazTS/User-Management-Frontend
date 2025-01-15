import { create } from 'zustand';
import { RoleStore } from './role.types';

const useRoleStore = create<RoleStore>((set) => ({
  databaseId: null,
  isViewPage: false,
  setDatabaseId: (id: number) => set(() => ({ databaseId: id })),
  toggleViewPage: (view: boolean) => set(() => ({ isViewPage: view })),
  reset: () => set(() => ({ databaseId: null,isViewPage:false })),
}));

export default useRoleStore;
