import type { NextRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { getCurrentStartDate } from "utils/helpers/dateTime";

export const logIn = (
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
        return res.json();
      }
      if (!res.ok) {
        return res
          .clone()
          .json()
          .then((error) => {
            throw error;
          });
      }
      return res.json();
    })
    .then((res) => {
      if (responseStatus === 401) {
        return setNotification({
          title: "Please Verify Email",
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
          duration: 5000,
          status: "info",
        });
        router.push(`/`);
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
        return setNotification({
          title: "Error",
          message: "You are sending too many requests. Please try again later.",
        });
      }

      return setNotification({
        title: "Error",
        message: errorMessage,
      });
    })
    .finally(() => setLoading(false));
};

export const signUp = (
  email: string,
  password: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setErrors: Dispatch<
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
      if (!res.ok) {
        return res
          .clone()
          .json()
          .then((error) => {
            throw error;
          });
      }
      return res.json();
    })
    .then((res) => {
      setNotification({
        title: "Account Created",
        message: res.message,
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      if (errorMessage.includes("email-already-in-use")) {
        return setErrors((currentErrors) => ({
          ...currentErrors,
          email: "This email is already registered with us. Please log in.",
        }));
      }
      return setNotification({
        title: "Error",
        message: error.message,
      });
    })
    .finally(() => setLoading(false));
};

export const logOut = (
  setIsLoggingOut: Dispatch<SetStateAction<boolean>>,
  router: NextRouter,
  setNotification: Dispatch<
    SetStateAction<{
      title: string;
      message: string;
    }>
  >,
  toast: any
) => {
  setIsLoggingOut(true);
  fetch(`/api/session`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        return res.json().then((error) => {
          throw error;
        });
      }
      toast({
        title: `You have successfully logged out.`,
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "success",
      });
      router.push(`/`);
      toast({
        title: `Redirecting...`,
        position: "top",
        isClosable: true,
        duration: 2000,
        status: "info",
      });
    })
    .catch((error) => {
      setNotification({
        title: "Error",
        message: error.message,
      });
    })
    .finally(() => setIsLoggingOut(false));
};

export const resetPassword = (
  email: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setErrors: Dispatch<
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
      if (!res.ok) {
        return res
          .clone()
          .json()
          .then((error) => {
            throw error;
          });
      }
      return res.json();
    })
    .then((res) => {
      setNotification({
        title: "Reset password email sent",
        message: res.message,
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      if (errorMessage.includes("user-not-found")) {
        return setErrors((currentErrors) => ({
          ...currentErrors,
          email: "This email is not registered with us. Please sign up.",
        }));
      }
      return setNotification({
        title: "Error",
        message: errorMessage,
      });
    })
    .finally(() => setLoading(false));
};
