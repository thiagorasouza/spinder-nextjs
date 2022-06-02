import { createContext } from "react";

import useAlertContext from "../hooks/useAlertContext";
import useAudio from "../hooks/useAudio";

const AudioContext = createContext(null);

function AudioContextProvider(props) {
  const { showAlert } = useAlertContext();
  const context = useAudio(showAlert);

  return (
    <AudioContext.Provider value={context}>
      {props.children}
    </AudioContext.Provider>
  );
}

export { AudioContext, AudioContextProvider };
