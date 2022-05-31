import { signIn } from "next-auth/react";
import { Card, Container, Button } from "react-bootstrap";

function LoginPage() {
  function signInAndRedirect() {
    signIn("spotify", { callbackUrl: "/" });
  }

  return (
    <Container className="d-flex flex-column justify-content-center min-vh-100">
      <Card className="text-center">
        <Card.Body>
          <Card.Title>Spinder</Card.Title>
          <Card.Text>Spotify meets Tinder</Card.Text>
          <Button onClick={signInAndRedirect}>Login with Spotify</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginPage;
