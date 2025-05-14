import { create } from 'zustand';
import { CustomerStore } from './customer.types';

const useCustomerStore = create<CustomerStore>((set) => ({
  databaseId: null,
  isViewPage: false,
  setDatabaseId: (id: number) => set(() => ({ databaseId: id })),
  toggleViewPage: (view: boolean) => set(() => ({ isViewPage: view })),
  reset: () => set(() => ({ databaseId: null,isViewPage:false })),
}));

export default useCustomerStore;
