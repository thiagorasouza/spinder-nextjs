import { useState } from "react";
import { Row, Col, Image, Button } from "react-bootstrap";

import { BsXLg } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import {
  MdInfo,
  MdPlayArrow,
  MdPlayDisabled,
  MdPause,
  MdLibraryAdd,
} from "react-icons/md";
import { BsBoxArrowUpRight } from "react-icons/bs";

import useAudio from "../../hooks/useAudio";
import useInfo from "../../hooks/useInfo";
import useAlert from "../../hooks/useAlert";
import InfoSlider from "../Sliders/InfoSlider";
import Overlay from "./Overlay";
import Alert from "../UI/Alert";

function CoverItem(props) {
  const [hovered, setHovered] = useState(true);
  const { playing, playAudio, pauseAudio } = useAudio();
  const { info, infoVisible, infoIsLoading, showInfo, hideInfo } = useInfo();
  const { alert, alertVisible, showAlert, hideAlert } = useAlert(1000);

  const audioURL = props.album.previewURL;
  const playable = audioURL !== null;

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
              position="top-right"
              onClick={() =>
                console.log(
                  `Saving album ${props.album.spotifyId} to your Spotify Library`
                )
              }
            >
              <MdLibraryAdd />
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
          <Button onClick={props.nextAlbum} className="btn-icon" size="lg">
            <BsXLg />
          </Button>
        </Col>
        <Col xs="auto">
          <Button
            onClick={() => props.saveAlbum(props.album)}
            className="btn-icon"
            size="lg"
          >
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
