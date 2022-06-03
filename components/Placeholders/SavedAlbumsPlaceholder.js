import Script from "next/script";
import { Card, Placeholder } from "react-bootstrap";
import Center from "../Layout/Center";
import Layout from "../Layout/Layout";

import styles from "./SavedAlbumsPlaceholder.module.css";

function SavedAlbumsPlaceholder() {
  const repetitions = 2;

  return (
    <>
      <Script src="holder.js" />
      <Layout>
        <Center>
          <div className={styles.card}>
            {[...Array(repetitions)].map((_, index) => (
              <Card
                key={index}
                className="mb-3 album-card album-card-placeholder"
              >
                <Card.Img
                  width="480"
                  height="480"
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
        </Center>
      </Layout>
    </>
  );
}

export default SavedAlbumsPlaceholder;