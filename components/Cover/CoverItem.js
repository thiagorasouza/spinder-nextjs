import { useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";

import { BsXLg } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { MdInfo, MdPlayArrow, MdPlayDisabled, MdPause } from "react-icons/md";

import useAudioContext from "../../hooks/useAudioContext";
import useInfo from "../../hooks/useInfo";
import useAlert from "../../hooks/useAlert";
import InfoSlider from "../Sliders/InfoSlider";
import Overlay from "./Overlay";
import Alert from "../UI/Alert";

function CoverItem(props) {
  const [hovered, setHovered] = useState(true);
  const { audio, playAudio, pauseAudio } = useAudioContext();
  const { info, infoVisible, infoIsLoading, showInfo, hideInfo } = useInfo();
  const { alert, alertVisible, showAlert, hideAlert } = useAlert(1000);

  function handleNextAlbum() {
    pauseAudio();
    props.nextAlbum();
  }

  function handleSaveAlbum() {
    pauseAudio();
    props.saveAlbum(props.album);
  }

  const audioURL = props.album.previewURL;
  const playable = audioURL !== null;
  const playing = audio && audio.src === audioURL;

  return (
    <>
      <Row className="mb-4">
        <Col sm="12">
          <div
            className="position-relative"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Image
              width="480"
              height="480"
              thumbnail
              rounded
              src={props.album.coverURL}
              alt=""
              className="cover-image"
            />
            <Overlay
              show={hovered}
              position="bottom-right"
              onClick={
                playable
                  ? playing
                    ? () => pauseAudio()
                    : () => playAudio(audioURL)
                  : () => showAlert("This preview is not available")
              }
            >
              {playable ? (
                playing ? (
                  <MdPause />
                ) : (
                  <MdPlayArrow />
                )
              ) : (
                <MdPlayDisabled />
              )}
            </Overlay>
            <Overlay
              show={hovered}
              position="bottom-left"
              onClick={() =>
                showInfo(props.album.artistName, props.album.albumName)
              }
            >
              <MdInfo />
            </Overlay>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button onClick={handleNextAlbum} className="btn-icon" size="lg">
            <BsXLg />
          </Button>
        </Col>
        <Col xs="auto">
          <Button onClick={handleSaveAlbum} className="btn-icon" size="lg">
            <FaHeart />
          </Button>
        </Col>
      </Row>
      <InfoSlider
        info={info}
        show={infoVisible}
        isLoading={infoIsLoading}
        onHide={hideInfo}
      />
      <Alert show={alertVisible} alert={alert} onClose={hideAlert} />
    </>
  );
}

export default CoverItem;
