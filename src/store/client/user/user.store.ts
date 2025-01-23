import { create } from "zustand";
import { UserStore } from "./user.types";

const useUserStore = create<UserStore>((set) => ({
  databaseId: null,
  isViewPage: false,
  setDatabaseId: (id: number) => set(() => ({ databaseId: id })),
  toggleViewPage: (view: boolean) => set(() => ({ isViewPage: view })),
  reset: () => set(() => ({ databaseId: null, isViewPage: false })),
}));

export default useUserStore;
