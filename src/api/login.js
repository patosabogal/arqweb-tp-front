import axios from "axios";

const LOGIN_PATH = "auth/login";
const LOGOUT_PATH = "auth/logout";
const REGISTER_PATH = "auth/register";

const login = async (user, password) => {
  return (
    await axios.post(
      LOGIN_PATH,
      {
        username: user,
        password: password
      },
      { withCredentials: true }
    )
  ).data;
};

const logout = () => {
  return axios.post(LOGOUT_PATH, {}, { withCredentials: true });
};

export const register = (user, email, password) => {
  return axios.post(
    REGISTER_PATH,
    {
      username: user,
      email: email,
      password: password
    },
    { withCredentials: true }
  );
};

export { login, logout };
