import { create } from "zustand";
import { GroupStore } from "./group.types";

const useGroupStore = create<GroupStore>((set) => ({
  databaseId: null,
  isViewPage: false,
  setDatabaseId: (id: number) => set(() => ({ databaseId: id })),
  toggleViewPage: (view: boolean) => set(() => ({ isViewPage: view })),
  reset: () => set(() => ({ databaseId: null, isViewPage: false })),
}));

export default useGroupStore;
