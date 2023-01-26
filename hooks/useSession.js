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
      .then((isAuthenticated) => {
        setUser(isAuthenticated);
      })
      .catch(() => {
        setUser(false);
      });
  });

  async function checkUserToken() {
    const { userToken } = cookies;

    const response = await fetch("/api/token", {
      method: "POST",
      body: JSON.stringify({ userToken }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.status === 200;
  }

  return [loading, user];
}

export default useSession;
