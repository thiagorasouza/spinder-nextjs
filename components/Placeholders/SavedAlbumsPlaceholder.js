import { Placeholder } from "react-bootstrap";
import AlbumCard from "../Album/AlbumCard";
import Layout from "../Layout/Layout";

function SavedAlbumsPlaceholder() {
  const repetitions = 2;

  const title = (
    <Placeholder animation="glow">
      <Placeholder xs={8} />
    </Placeholder>
  );

  const subtitle = (
    <Placeholder animation="glow">
      <Placeholder xs={6} />
    </Placeholder>
  );

  return (
    <Layout noScroll>
      {[...Array(repetitions)].map((_, index) => (
        <AlbumCard
          key={index}
          image="/img/placeholder480x480.svg"
          title={title}
          subtitle={subtitle}
        />
      ))}
    </Layout>
  );
}

export default SavedAlbumsPlaceholder;

const base64Image = "";
