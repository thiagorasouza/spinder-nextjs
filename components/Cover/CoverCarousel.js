import { Row, Col } from "react-bootstrap";

import CoverCarouselImage from "./CoverCarouselImage";
import CoverSaveButton from "./CoverSaveButton";
import CoverNextButton from "./CoverNextButton";

import useAudioContext from "../../hooks/useAudioContext";

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
    <>
      <Row className="mb-4">
        <Col>
          <CoverCarouselImage album={props.album} onInfo={props.onInfo} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col>
          <CoverNextButton onClick={handleNextAlbum} />
        </Col>
        <Col>
          <CoverSaveButton onClick={handleSaveAlbum} />
        </Col>
      </Row>
    </>
  );
}

export default CoverCarousel;
