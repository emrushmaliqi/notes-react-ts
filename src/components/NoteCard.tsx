import MDEditor from "@uiw/react-md-editor";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { NoteType } from "../Types";

interface Props {
  note: NoteType;
}

export default function NoteCard({ note }: Props) {
  return (
    <Link to={`/note/${note.name}`} className="noteCard">
      <Card
        style={{
          width: "15rem",
          height: "18rem",
          overflow: "hidden",
        }}
      >
        <Card.Body>
          <Card.Title>{note.name}</Card.Title>
        </Card.Body>
        <Card.Text>
          <MDEditor
            style={{ outline: "none" }}
            visibleDragbar={false}
            height={300}
            hideToolbar={true}
            preview="preview"
            data-color-mode="light"
            value={note.content}
          />
        </Card.Text>
      </Card>
    </Link>
  );
}
