export interface ILoginWithEmailPasswordParams {
  email: string;
  password: string;
  onSuccess: () => void;
  onFail: () => void;
  onFinal: () => void;
}
