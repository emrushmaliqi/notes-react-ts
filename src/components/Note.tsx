import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NoteType } from "../Types";
import CreateFile from "./CreateFile";

export default function Note({
  notes,
  setNotes,
}: {
  notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const [note, setNote] = useState(
    notes.find(note => note.name == params.note)
  );

  if (note) {
    if (isEditing)
      return (
        <CreateFile
          setNotes={setNotes}
          note={note}
          setIsEditing={state => setIsEditing(state)}
          setNote={state => setNote(state)}
        />
      );

    return (
      <div className="container">
        <div
          className="d-flex justify-content-between px-5 align-items-center"
          style={{
            width: "100%",
            borderBottom: "2px solid black",
            padding: "1em 0",
            marginBottom: "0.5em",
          }}
        >
          <h2>{note.name}</h2>
          <FontAwesomeIcon
            onClick={() => setIsEditing(true)}
            icon={faPencil}
            style={{ cursor: "pointer" }}
          />
        </div>
        <p>{note.content}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h3>Note doesn't exist</h3>
    </div>
  );
}
