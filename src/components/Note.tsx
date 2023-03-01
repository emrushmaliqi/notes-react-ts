import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNotesContext, useSetNotes } from "../hooks/noteHooks";
import { NoteType } from "../Types";
import CreateNote from "./CreateNote";

export default function Note() {
  const { notes, dispatch } = useNotesContext();
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const note = notes.find(n => n._id === params.note);

  useEffect(() => {
    if (notes.length === 0) {
      useSetNotes(dispatch, params.note);
    }
    console.log(notes);
  }, [dispatch]);

  if (note) {
    if (isEditing)
      return (
        <CreateNote note={note} setIsEditing={state => setIsEditing(state)} />
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
          <h2>{note.title}</h2>
          <FontAwesomeIcon
            onClick={() => setIsEditing(true)}
            icon={faPencil}
            style={{ cursor: "pointer" }}
          />
        </div>
        <MDEditor
          visibleDragbar={false}
          hideToolbar={true}
          preview="preview"
          height={700}
          data-color-mode="light"
          value={note.content}
        />
      </div>
    );
  }

  return (
    <div className="container">
      <h3>Note doesn't exist</h3>
    </div>
  );
}
