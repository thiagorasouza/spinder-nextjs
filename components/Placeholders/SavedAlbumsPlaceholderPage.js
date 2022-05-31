import Script from "next/script";
import { Card, Container, Placeholder } from "react-bootstrap";
import Layout from "../Layout/Layout";

function SavedAlbumsPlaceholderPage() {
  const repetitions = 2;

  return (
    <Layout>
      <Script src="holder.js" />
      <div className="overflow-hidden" style={{ maxHeight: "91vh" }}>
        {[...Array(repetitions)].map((_, index) => (
          <Card key={index} className="mb-3">
            <Card.Img
              width="640"
              height="640"
              className="cover-image"
              variant="top"
              data-src="holder.js/640x640?auto=yes&text=..."
            />
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={8} />
              </Placeholder>
              <Placeholder as={Card.Subtitle} animation="glow">
                <Placeholder xs={6} />
              </Placeholder>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Layout>
  );
}

export default SavedAlbumsPlaceholderPage;
