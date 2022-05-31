import { createContext } from "react";
import useAudio from "../hooks/useAudio";

const AudioContext = createContext(null);

function AudioContextProvider(props) {
  const context = useAudio();
  console.log(context);

  return (
    <AudioContext.Provider value={context}>
      {props.children}
    </AudioContext.Provider>
  );
}

export { AudioContext, AudioContextProvider };
