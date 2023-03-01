import { useEffect, useRef, useState } from "react";
import { useLocalNotes } from "../hooks/UseLocal";
import { NoteType } from "../Types";
import { useLocation, useNavigate } from "react-router";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "react-bootstrap";
import {
  useCreateNote,
  useNotesContext,
  useUpdateNote,
} from "../hooks/noteHooks";

interface Props {
  note?: NoteType;
  setIsEditing?: (state: boolean) => void;
}

export default function CreateNote({ note, setIsEditing }: Props) {
  const { dispatch } = useNotesContext();
  const navigate = useNavigate();
  const location = useLocation();
  const titleRef = useRef<HTMLInputElement>(null);
  const [noteContent, setNoteContent] = useState<string>();

  useEffect(() => {
    if (note) {
      if (titleRef.current) titleRef.current.value = note.title;
      setNoteContent(note.content);
    }
  }, []);

  function addFile() {
    if (titleRef.current) {
      const titleValue = titleRef.current.value;
      // if (titleValue.trim()) {
      const inputNote: NoteType = {
        title: titleValue ? titleValue : "Untitled",
        content: noteContent ? noteContent : " ",
      };
      if (location.state?.folder) {
        inputNote.folder = location.state.folder;
        navigate(`/folders/${location.state.folder}`, { replace: true });
      } else {
        navigate("/", { replace: true });
      }
      useCreateNote(dispatch, inputNote);
    }
  }

  const editFile = async () => {
    if (note && setIsEditing && titleRef.current) {
      const titleValue = titleRef.current.value;
      await useUpdateNote(dispatch, {
        _id: note._id,
        content: noteContent ? noteContent : " ",
        title: titleValue ? titleValue : "Untitled",
      });

      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (note && titleRef.current) {
      titleRef.current.value = note.title;
    }
  }, []);

  function handleSave(): void {
    if (!note) return addFile();
    editFile();
  }

  return (
    <div className="container">
      <form className="d-flex flex-column">
        {/* {note ? (
          <h2
            style={{
              width: "100%",
              outline: "none",
              border: "none",
              borderBottom: "2px solid black",
              lineHeight: "1.2",
              padding: "0.5em 0",
            }}
          >
            {note.title}
          </h2>
        ) : ( */}
        <>
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            style={{
              width: "100%",
              outline: "none",
              border: "none",
              borderBottom: "2px solid black",
              lineHeight: "1.2",
              padding: "1em 0",
              fontSize: "22px",
            }}
          />
        </>

        <MDEditor
          height={600}
          data-color-mode="light"
          value={noteContent}
          onChange={setNoteContent}
        />
        <div className="mt-4" style={{ width: "33%", alignSelf: "flex-end" }}>
          {setIsEditing && (
            <Button
              onClick={() => setIsEditing(false)}
              style={{ width: "33%", marginRight: "1%" }}
            >
              Go Back
            </Button>
          )}
          <Button onClick={handleSave} style={{ width: "66%" }}>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
