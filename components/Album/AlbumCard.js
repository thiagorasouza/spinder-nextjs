import Image from "next/image";
import { Card } from "react-bootstrap";
import ExternalLink from "../UI/ExternalLink";

import styles from "./AlbumCard.module.css";

function AlbumCard(props) {
  return (
    <Card className={styles.card}>
      {props.controls && (
        <div
          className="position-absolute top-0 end-0 p-1 d-flex gap-1 bg-light"
          style={{ zIndex: 1020 }}
        >
          {props.controls}
        </div>
      )}
      <div>
        <Image
          width="480"
          height="480"
          src={props.image}
          layout="responsive"
          className="card-img-top"
          alt=""
        />
      </div>
      <Card.Body>
        <div className="d-flex flex-column">
          <Card.Title>
            <span className="fw-bold">{props.title}&nbsp;</span>
            {props.link && <ExternalLink url={props.link} />}
          </Card.Title>
          <Card.Subtitle>{props.subtitle}</Card.Subtitle>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AlbumCard;
