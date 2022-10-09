import { Nav } from "react-bootstrap";
import { FaItunesNote } from "react-icons/fa";

import Offcanvas from "../UI/Offcanvas";

function GenreMenu(props) {
  const icon = <FaItunesNote className="text-primary mt-1" />;

  return (
    <Offcanvas
      show={props.show}
      onHide={props.onHide}
      placement="end"
      id="genre-menu"
      titleIcon={icon}
      titleText="Genres"
    >
      <Nav as="ul" activeKey={props.active} className="flex-column">
        {props.genres.map((genre) => {
          return (
            <Nav.Item as="li" key={genre}>
              <Nav.Link
                eventKey={genre}
                onClick={() => props.onGenreClick(genre)}
              >
                {genre}
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </Offcanvas>
  );
}

export default GenreMenu;
