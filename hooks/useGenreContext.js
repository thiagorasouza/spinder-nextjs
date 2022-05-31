import { useContext } from "react";
import { GenreContext } from "../context/genre";

function useGenreContext() {
  return useContext(GenreContext);
}

export default useGenreContext;
