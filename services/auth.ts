// const ROOT_URL = "http://localhost:3000";

const login = (email: string, password: string) => {
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
    .then((res) => console.log(res))
    .catch((error) => console.error(error));
};

export default {
  login,
};
