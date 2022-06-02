import { createContext } from "react";
import useAlert from "../hooks/useAlert";

const AlertContext = createContext(null);

function AlertContextProvider(props) {
  const context = useAlert();

  return (
    <AlertContext.Provider value={context}>
      {props.children}
    </AlertContext.Provider>
  );
}

export { AlertContext, AlertContextProvider };
