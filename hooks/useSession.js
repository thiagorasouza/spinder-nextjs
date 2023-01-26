import { useState } from "react";
import { useCookies } from "react-cookie";
import useMountEffect from "./useMountEffect";

function useSession() {
  const [cookies] = useCookies();
  const [user, setUser] = useState(null);
  const loading = user === null;

  useMountEffect(() => {
    if (!cookies.userToken) {
      return setUser(false);
    }

    checkUserToken()
      .then((user) => {
        setUser(user);
      })
      .catch(() => {
        setUser(false);
      });
  });

  async function checkUserToken() {
    const { userToken } = cookies;

    const response = await fetch("/api/session", {
      method: "POST",
      body: JSON.stringify({ userToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      return false;
    }

    return await response.json();
  }

  return [user, loading];
}

export default useSession;
