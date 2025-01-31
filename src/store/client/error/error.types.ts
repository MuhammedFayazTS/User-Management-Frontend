export interface ErrorState {
    errorMessage: string | null
    errorCode: number | null
  }
  
  export interface ErrorActions {
    setError: (message: string, code?: number) => void
    resetError: () => void
  }
  
  export type ErrorStore = ErrorState & ErrorActions
  