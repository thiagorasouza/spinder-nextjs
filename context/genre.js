import { createContext } from "react";
import SpotifyApi from "../lib/spotify-api";
import useCache from "../hooks/useCache";

const genres = SpotifyApi.getGenres();
const randomGenre = SpotifyApi.getRandomGenre();
const GenreContext = createContext(null);

function GenreContextProvider(props) {
  const [genre, setGenre] = useCache("genre", randomGenre);

  const context = {
    genres,
    genre,
    setGenre,
  };

  return (
    <GenreContext.Provider value={context}>
      {props.children}
    </GenreContext.Provider>
  );
}

export { GenreContext, GenreContextProvider };
