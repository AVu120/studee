export interface IHandleAsyncErrorsParams<T> {
  onSuccess?: (params?: unknown) => void;
  onFail?: (params?: unknown) => void;
  onFinal?: (params?: unknown) => void;
  func: (params?: T) => Promise<T>;
}
