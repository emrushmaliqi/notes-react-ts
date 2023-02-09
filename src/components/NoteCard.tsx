import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { NoteType } from "../Types";

interface Props {
  note: NoteType;
}

export default function NoteCard({ note }: Props) {
  return (
    <Link to={`/note/${note.name}`}>
      <Card
        style={{
          width: "15rem",
          height: "18rem",
          overflow: "hidden",
        }}
      >
        <Card.Body>
          <Card.Title>{note.name}</Card.Title>
          <Card.Text>{note.content}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
}
