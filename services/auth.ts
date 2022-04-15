// const ROOT_URL = "http://localhost:3000";

import type { NextRouter } from "next/router";
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
  >,
  setNotification: Dispatch<SetStateAction<{ title: string; message: string }>>,
  router: NextRouter
) => {
  let responseStatus: number;
  let notificationTitle: string;
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
      // If user hasn't verified email, remind them to verify their email before logging in.
      if (res.status === 401) {
        responseStatus = res.status;
        notificationTitle = res.statusText;
        return res.json();
      }
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json();
    })
    .then((res) => {
      if (responseStatus === 401) {
        return setNotification({
          title: notificationTitle,
          message: res.message,
        });
      }

      fetch(`/api/session`, {
        method: "POST",
        body: JSON.stringify({
          idToken: res.idToken,
          csrfToken: res.csrfToken,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(() => router.push("/me"));
    })
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
  setNotification: Dispatch<
    SetStateAction<{
      title: string;
      message: string;
    }>
  >
) => {
  let statusText: string;
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
      statusText = res.statusText;
      if (!res.ok) {
        throw new Error(statusText);
      }
      return res.json();
    })
    .then((res) => {
      console.log({ res2: res });
      setNotification({
        title: statusText,
        message: res.message,
      });
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
