import { create } from "zustand";
import { ErrorStore } from "./error.types";

const useErrorStore = create<ErrorStore>((set) => ({
  errorMessage: null,
  errorCode: null,

  setError: (message: string, code?: number) =>
    set(() => ({ errorMessage: message, errorCode: code ?? null })),
  resetError: () => set(() => ({ errorMessage: null, errorCode: null })),
}));

export default useErrorStore;
