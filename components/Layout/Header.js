import { Container, Navbar, Button } from "react-bootstrap";
import { FaBars, FaItunesNote } from "react-icons/fa";

function Header(props) {
  return (
    <Navbar expand={false} fixed="top" className="bg-white">
      <Container>
        <Button
          arial-controls="app-menu"
          onClick={props.appMenuClick}
          className="btn-icon"
        >
          <FaBars />
        </Button>

        <Navbar.Brand>Spinder</Navbar.Brand>

        <Button
          arial-controls="genre-menu"
          onClick={props.genreMenuClick}
          className="btn-icon"
        >
          <FaItunesNote />
        </Button>
      </Container>
    </Navbar>
  );
}

export default Header;
