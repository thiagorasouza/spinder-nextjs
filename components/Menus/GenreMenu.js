import { Offcanvas, Nav } from "react-bootstrap";

function GenreMenu(props) {
  return (
    <Offcanvas
      show={props.show}
      onHide={props.onHide}
      placement="end"
      id="genre-menu"
      aria-labelledby="genre-menu-label"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="genre-menu-label">Genre</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
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
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default GenreMenu;
