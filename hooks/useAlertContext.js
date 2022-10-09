import { useContext } from "react";
import { AlertContext } from "../context/alert";

function useAlertContext() {
  return useContext(AlertContext);
}

export default useAlertContext;
