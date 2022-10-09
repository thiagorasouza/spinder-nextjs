import { useContext } from "react";
import { AudioContext } from "../context/audio";

function useAudioContext() {
  return useContext(AudioContext);
}

export default useAudioContext;
