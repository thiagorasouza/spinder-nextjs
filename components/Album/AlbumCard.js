import Image from "next/image";
import Script from "next/script";
import { Card } from "react-bootstrap";
import ExternalLink from "../UI/ExternalLink";

import styles from "./AlbumCard.module.css";

function AlbumCard(props) {
  return (
    <>
      <Card className={styles.card}>
        <div
          className="position-absolute top-0 end-0 px-1 py-1 d-flex gap-1 bg-light"
          style={{ zIndex: 1020 }}
        >
          {props.controls}
        </div>
        <div>
          <Image
            width="480"
            height="480"
            src={props.image}
            layout="responsive"
            className="card-img-top image-cover"
            alt=""
          />
        </div>
        <Card.Body className="d-flex align-items-center">
          <div className="d-flex flex-column">
            <Card.Title className="d-flex">
              <div>{props.title}&nbsp;</div>
              <ExternalLink url={props.link} />
            </Card.Title>
            <Card.Subtitle>{props.subtitle}</Card.Subtitle>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default AlbumCard;
