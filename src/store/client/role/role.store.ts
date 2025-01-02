import { create } from 'zustand';
import { RoleStore } from './role.types';

const useRoleStore = create<RoleStore>((set) => ({
  databaseId: null,
  setDatabaseId: (id: number) => set(() => ({ databaseId: id })),
  reset: () => set(() => ({ databaseId: null })),
}));

export default useRoleStore;
