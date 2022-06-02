import { Container, Navbar, Button, Image } from "react-bootstrap";
import { FaBars, FaItunesNote } from "react-icons/fa";

import AppMenu from "../Menus/AppMenu";
import GenreMenu from "../Menus/GenreMenu";

import { useState } from "react";
import useGenreContext from "../../hooks/useGenreContext";

import styles from "./Layout.module.css";

function Layout(props) {
  const { genre, genres, setGenre } = useGenreContext();
  const [appMenuVisible, setAppMenuVisible] = useState(false);
  const [genreMenuVisible, setGenreMenuVisible] = useState(false);

  function handleGenreClick(genre) {
    setGenre(genre);
    setGenreMenuVisible(false);
  }

  return (
    <Container className="container-center">
      <Navbar expand={false} fixed="top" bg="light" className={styles.navbar}>
        {/* <Container> */}
        <Button
          arial-controls="app-menu"
          onClick={() => setAppMenuVisible(true)}
          className="btn-icon"
          variant="link"
        >
          <Image
            alt="site logo"
            src="/img/logo-purple.png"
            width="24"
            height="24"
          />
        </Button>
        <Navbar.Brand className="fw-bold">Spinder</Navbar.Brand>
        <Button
          arial-controls="genre-menu"
          onClick={() => setGenreMenuVisible(true)}
          className="btn-icon"
          disabled={!props.genreMenu}
          variant="link"
        >
          <FaItunesNote />
        </Button>
        {/* </Container> */}
      </Navbar>

      <div>{props.children}</div>

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
