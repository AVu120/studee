// const ROOT_URL = "http://localhost:3000";

import { Dispatch, SetStateAction } from "react";

const login = (
  email: string,
  password: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<
    SetStateAction<{
      email: string;
      password: { arguments: number; message: string; validation: string }[];
    }>
  >
) => {
  setLoading(true);
  fetch(`/api/auth`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      console.log({ res1: res });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => console.log({ res2: res }))
    .catch((error) => {
      let errorMessage = error.message;
      if (errorMessage.includes("user-not-found")) {
        errorMessage = "This email is not registered with us. Please sign up.";
      }

      setError((currentErrors) => ({ ...currentErrors, email: errorMessage }));
    })
    .finally(() => setLoading(false));
};

const signUp = (
  email: string,
  password: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<
    SetStateAction<{
      email: string;
      password: { arguments: number; message: string; validation: string }[];
    }>
  >,
  setNotification: Dispatch<SetStateAction<string>>
) => {
  setLoading(true);
  fetch(`/api/user`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      console.log({ res1: res });
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then((res) => {
      console.log({ res2: res });
      setNotification(res.message);
    })
    .catch((error) => {
      const errorMessage = error.message;
      setError((currentErrors) => ({ ...currentErrors, email: errorMessage }));
    })
    .finally(() => setLoading(false));
};

export default {
  login,
  signUp,
};
