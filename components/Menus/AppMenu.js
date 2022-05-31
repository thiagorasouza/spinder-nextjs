import { Offcanvas, Nav } from "react-bootstrap";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

function AppMenu(props) {
  const router = useRouter();

  function signOutAndRedirect() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <Offcanvas
      show={props.show}
      onHide={props.onHide}
      placement="start"
      id="app-menu"
      aria-labelledby="app-menu-label"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="app-menu-label">Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav as="ul" activeKey={router.asPath} className="flex-column">
          <Nav.Item as="li">
            <Link href="/" passHref>
              <Nav.Link>Discover Albums</Nav.Link>
            </Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Link href="/saved" passHref>
              <Nav.Link>Saved Albums</Nav.Link>
            </Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Link href="/account" passHref>
              <Nav.Link>Manage Account</Nav.Link>
            </Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link onClick={signOutAndRedirect}>Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default AppMenu;
