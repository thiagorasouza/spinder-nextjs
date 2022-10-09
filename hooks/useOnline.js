import { useState } from "react";
import useMountEffect from "./useMountEffect";

function useOnline() {
  const [online, setOnline] = useState(true);

  useMountEffect(() => {
    setOnline(window.navigator.onLine);

    const setOnlineHandler = () => setOnline(true);
    const setOfflineHandler = () => setOnline(false);
    window.addEventListener("online", setOnlineHandler);
    window.addEventListener("offline", setOfflineHandler);

    return () => {
      window.removeEventListener("online", setOnlineHandler);
      window.removeEventListener("offline", setOfflineHandler);
    };
  });

  return online;
}

export default useOnline;
