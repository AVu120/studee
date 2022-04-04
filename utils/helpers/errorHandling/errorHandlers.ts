import type {
  IHandleAsyncErrorsParams,
  // IHandleSyncErrorsParams,
} from "utils/helpers/errorHandling/types";

const emptyFunction = () => {};

// Provider error-handling to catch errors and display them on the client.
// const handleSyncErrors = ({
//   func,
//   onSuccess = emptyFunction,
//   onFail = emptyFunction,
//   onFinal = emptyFunction,
// }: IHandleSyncErrorsParams) => {
//   try {
//     func();
//     onSuccess();
//   } catch (error) {
//     onFail(error);
//   } finally {
//     onFinal();
//   }
// };
const handleAsyncErrors = async <T>({
  func,
  onSuccess = emptyFunction,
  onFail = emptyFunction,
  onFinal = emptyFunction,
}: IHandleAsyncErrorsParams<T>) => {
  try {
    await func();
    onSuccess();
  } catch (error) {
    onFail(error);
  } finally {
    onFinal();
  }
};

export default handleAsyncErrors;
