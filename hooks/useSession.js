import { useReducer } from "react";
import { getUserFromToken } from "../lib/http";
import useMountEffect from "./useMountEffect";

function useSession() {
  const [state, dispatch] = useReducer(reducer, {
    status: "initial",
    user: undefined,
  });

  useMountEffect(() => {
    dispatch({ type: "check" });
    checkUser();
  });

  function reducer(state, action) {
    switch (action.type) {
      case "reset":
        return {
          status: "initial",
          user: undefined,
        };
      case "check":
        return {
          status: "loading",
          user: undefined,
        };
      case "success":
        return {
          status: "authenticated",
          user: action.data,
        };
      case "fail":
        return {
          status: "unauthenticated",
          user: null,
        };
      default:
        throw new Error("Invalid state");
    }
  }

  async function checkUser() {
    const userToken = getUserToken();
    if (!userToken) {
      return dispatch({ type: "fail" });
    }

    const user = await getUserFromToken(userToken);
    if (!user) {
      return dispatch({ type: "fail" });
    }

    dispatch({ type: "success", data: user });
  }

  async function loginUser(token) {
    dispatch({ type: "reset" });
    unsetUserToken();

    setUserToken(token);
    await checkUser();
  }

  async function logoutUser() {
    dispatch({ type: "reset" });
    unsetUserToken();
  }

  function getUserToken() {
    const cookie = document.cookie
      .split(";")
      .find((item) => item.trim().startsWith("userToken="));

    return cookie ? cookie.split("=")[1] : null;
  }

  function setUserToken(token) {
    document.cookie = `userToken=${token}`;
  }

  function unsetUserToken() {
    document.cookie = `userToken=`;
  }

  return {
    status: state.status,
    user: state.user,
    login: loginUser,
    logout: logoutUser,
  };
}

export default useSession;
