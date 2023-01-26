import { createContext } from "react";
import useSession from "../hooks/useSession";

const SessionContext = createContext(null);

function SessionContextProvider(props) {
  const context = useSession();

  return (
    <SessionContext.Provider value={context}>
      {props.children}
    </SessionContext.Provider>
  );
}

export { SessionContext, SessionContextProvider };
