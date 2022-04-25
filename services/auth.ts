// const ROOT_URL = "http://localhost:3000";

import type { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { getCurrentStartDate } from "utils/helpers/dateTime";

export const login = (
  email: string,
  password: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<
    SetStateAction<{
      email: string;
      password: { arguments?: number; message: string; validation?: string }[];
    }>
  >,
  setNotification: Dispatch<SetStateAction<{ title: string; message: string }>>,
  router: NextRouter,
  toast: any
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
      toast({
        title: `You have successfully logged in.`,
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "success",
      });
      fetch(`/api/session`, {
        method: "POST",
        body: JSON.stringify({
          idToken: res.idToken,
          csrfToken: res.csrfToken,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then(() => {
        toast({
          title: `Redirecting...`,
          position: "top",
          isClosable: true,
          duration: 2000,
          status: "info",
        });
        router.push(`/me/week/${getCurrentStartDate()}`);
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      if (errorMessage.includes("user-not-found")) {
        return setError((currentErrors) => ({
          ...currentErrors,
          email: "This email is not registered with us. Please sign up.",
        }));
      }

      if (errorMessage.includes("wrong-password")) {
        return setError((currentErrors) => ({
          ...currentErrors,
          password: [{ message: "Wrong password." }],
        }));
      }

      if (errorMessage.includes("too-many-requests")) {
        return setError((currentErrors) => ({
          ...currentErrors,
          email: "You are sending too many requests. Please try again later.",
        }));
      }

      return setError((currentErrors) => ({
        ...currentErrors,
        email: errorMessage,
      }));
    })
    .finally(() => setLoading(false));
};

export const signUp = (
  email: string,
  password: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<
    SetStateAction<{
      email: string;
      password: { arguments?: number; message: string; validation?: string }[];
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
      statusText = res.statusText;
      if (!res.ok) {
        throw new Error(statusText);
      }
      return res.json();
    })
    .then((res) => {
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

export const logOut = (
  setIsLoggingOut: Dispatch<SetStateAction<boolean>>,
  router: NextRouter,
  toast: any
) => {
  let statusText: string;
  setIsLoggingOut(true);
  fetch(`/api/session`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(statusText);
      }
      toast({
        title: `You have successfully logged out.`,
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "success",
      });
      router.push(`/`);
    })
    .catch((error) => {
      alert(error.message);
    })
    .finally(() => setIsLoggingOut(false));
};

export const resetPassword = (
  email: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<
    SetStateAction<{
      email: string;
      password: { arguments?: number; message: string; validation?: string }[];
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
  fetch(`/api/resetPassword`, {
    method: "POST",
    body: JSON.stringify({
      email,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      statusText = res.statusText;
      if (!res.ok) {
        throw new Error(statusText);
      }
      return res.json();
    })
    .then((res) => {
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
