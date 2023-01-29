import { useState } from "react";
import { FaItunesNote } from "react-icons/fa";

import AppMenu from "../Menus/AppMenu";
import GenreMenu from "../Menus/GenreMenu";
import IconButton from "../UI/IconButton";
import { Container, Navbar, Image } from "react-bootstrap";

import useGenreContext from "../../hooks/useGenreContext";

import classNames from "classnames";

function Layout({
  loadGenreMenu = false,
  verticallyCenter = false,
  noScroll = false,
  children,
}) {
  const { genre, genres, setGenre } = useGenreContext();
  const [appMenuVisible, setAppMenuVisible] = useState(false);
  const [genreMenuVisible, setGenreMenuVisible] = useState(false);

  function handleGenreClick(genre) {
    setGenre(genre);
    setGenreMenuVisible(false);
  }

  const containerStyle = classNames(
    "m-auto position-absolute top-0 start-0 bottom-0 end-0 d-flex flex-column",
    {
      "overflow-hidden": noScroll,
      "pt-7": !verticallyCenter,
    }
  );

  return (
    <Container className={containerStyle}>
      <Navbar
        expand={false}
        fixed="top"
        bg="light"
        className="mt-1 mx-1 p-2 rounded-1 shadow-sm"
      >
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
          disabled={!loadGenreMenu}
          variant="link"
        >
          <FaItunesNote className="align-text-top" />
        </IconButton>
      </Navbar>

      <main>{children}</main>

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
