import { useContext } from "react";
import { SessionContext } from "../context/session";

function useSessionContext() {
  return useContext(SessionContext);
}

export default useSessionContext;
