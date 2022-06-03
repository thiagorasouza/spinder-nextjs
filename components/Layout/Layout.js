import { Container, Navbar, Button, Image } from "react-bootstrap";
import { FaItunesNote } from "react-icons/fa";

import AppMenu from "../Menus/AppMenu";
import GenreMenu from "../Menus/GenreMenu";

import { useState } from "react";
import useGenreContext from "../../hooks/useGenreContext";

import styles from "./Layout.module.css";
import IconButton from "../UI/IconButton";

function Layout(props) {
  const { genre, genres, setGenre } = useGenreContext();
  const [appMenuVisible, setAppMenuVisible] = useState(false);
  const [genreMenuVisible, setGenreMenuVisible] = useState(false);

  function handleGenreClick(genre) {
    setGenre(genre);
    setGenreMenuVisible(false);
  }

  return (
    <Container className={styles.container}>
      <Navbar expand={false} fixed="top" bg="light" className={styles.navbar}>
        <IconButton
          arial-controls="app-menu"
          onClick={() => setAppMenuVisible(true)}
          variant="link"
        >
          <Image
            alt="site logo"
            src="/img/logo-purple.png"
            width="24"
            height="24"
          />
        </IconButton>
        <Navbar.Brand className="fw-bold">Spinder</Navbar.Brand>
        <IconButton
          arial-controls="genre-menu"
          onClick={() => setGenreMenuVisible(true)}
          disabled={!props.genreMenu}
          variant="link"
        >
          <FaItunesNote className="align-text-top" />
        </IconButton>
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
