import { Nav, Image } from "react-bootstrap";
import Offcanvas from "../UI/Offcanvas";

import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

function AppMenu(props) {
  const router = useRouter();

  function signOutAndRedirect() {
    signOut({ callbackUrl: "/login" });
  }

  const icon = (
    <Image alt="site logo" src="/img/logo-purple.png" width="30" height="30" />
  );

  return (
    <Offcanvas
      show={props.show}
      onHide={props.onHide}
      placement="start"
      id="app-menu"
      titleIcon={icon}
      titleText="Spinder"
    >
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
    </Offcanvas>
  );
}

export default AppMenu;
