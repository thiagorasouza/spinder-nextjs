import { Container, Navbar, Button } from "react-bootstrap";
import { FaBars, FaItunesNote, FaArrowLeft } from "react-icons/fa";

import AppMenu from "../Menus/AppMenu";
import GenreMenu from "../Menus/GenreMenu";

import { useState } from "react";
import useGenreContext from "../../hooks/useGenreContext";

function Layout(props) {
  const { genre, genres, setGenre } = useGenreContext();
  const [appMenuVisible, setAppMenuVisible] = useState(false);
  const [genreMenuVisible, setGenreMenuVisible] = useState(false);

  function handleGenreClick(genre) {
    setGenre(genre);
    setGenreMenuVisible(false);
  }

  return (
    <Container>
      <Navbar expand={false} fixed="top" className="bg-white mx-3">
        {/* <Container> */}
        <Button
          arial-controls="app-menu"
          onClick={() => setAppMenuVisible(true)}
          className="btn-icon"
        >
          <FaBars />
        </Button>
        <Navbar.Brand>Spinder</Navbar.Brand>
        <Button
          arial-controls="genre-menu"
          onClick={() => setGenreMenuVisible(true)}
          className="btn-icon"
          disabled={!props.genreMenu}
        >
          <FaItunesNote />
        </Button>
        {/* </Container> */}
      </Navbar>

      <div style={{ paddingTop: "9vh" }}>{props.children}</div>

      <AppMenu show={appMenuVisible} onHide={() => setAppMenuVisible(false)} />
      <GenreMenu
        active={genre}
        genres={genres}
        onGenreClick={handleGenreClick}
        show={genreMenuVisible}
        onHide={() => setGenreMenuVisible(false)}
      />
    </Container>
  );
}

export default Layout;
