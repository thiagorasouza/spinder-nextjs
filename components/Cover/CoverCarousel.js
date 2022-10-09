import { Row, Col } from "react-bootstrap";

import CoverCarouselImage from "./CoverCarouselImage";
import CoverSaveButton from "./CoverSaveButton";
import CoverNextButton from "./CoverNextButton";

import useAudioContext from "../../hooks/useAudioContext";

import styles from "./CoverCarousel.module.css";

function CoverCarousel(props) {
  const { pauseAudio } = useAudioContext();

  function handleNextAlbum() {
    pauseAudio();
    props.onNextAlbum();
  }

  function handleSaveAlbum() {
    pauseAudio();
    props.onSaveAlbum(props.album);
  }

  return (
    <div className={styles.container}>
      <Row className="mb-4 justify-content-center">
        <Col>
          <CoverCarouselImage album={props.album} onInfo={props.onInfo} />
        </Col>
      </Row>
      <Row>
        <Col className="text-end">
          <CoverNextButton onClick={handleNextAlbum} />
        </Col>
        <Col>
          <CoverSaveButton onClick={handleSaveAlbum} />
        </Col>
      </Row>
    </div>
  );
}

export default CoverCarousel;
