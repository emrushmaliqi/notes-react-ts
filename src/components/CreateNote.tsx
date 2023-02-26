import { useEffect, useRef, useState } from "react";
import { useLocalNotes } from "../hooks";
import { NoteType } from "../Types";
import { useLocation, useNavigate } from "react-router";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "react-bootstrap";

interface Props {
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  notes?: NoteType[];
  note?: NoteType;
  setIsEditing?: (state: boolean) => void;
  setNote?: (state: NoteType) => void;
}

export default function CreateNote({
  setNotes,
  notes,
  note,
  setIsEditing,
  setNote,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const titleRef = useRef<HTMLInputElement>(null);
  const [noTitle, setNoTitle] = useState(false);
  const [noteContent, setNoteContent] = useState<string>();

  useEffect(() => {
    if (note) {
      if (titleRef.current) titleRef.current.value = note.name;
      setNoteContent(note.content);
    }
  }, []);

  function addFile() {
    if (titleRef.current) {
      if (titleRef.current.value.trim()) {
        const prevLocal = useLocalNotes();
        const inputNote: NoteType = {
          name: titleRef.current.value,
          content: noteContent ? noteContent : "",
        };
        if (notes && notes.find(note => note.name == inputNote.name)) {
          const date = new Date();
          inputNote.name += " - " + date.toLocaleString();
          inputNote.name = inputNote.name.replaceAll("/", "-");
        }
        if (location.state?.folder) {
          inputNote.folder = location.state.folder;
          navigate(`/folders/${location.state.folder}`, { replace: true });
        } else {
          navigate("/", { replace: true });
        }
        localStorage.setItem(
          "notes",
          JSON.stringify([inputNote, ...prevLocal])
        );
        setNotes(useLocalNotes());
      } else {
        setNoTitle(true);
      }
    }
  }

  function editFile() {
    if (note && setIsEditing && setNote && noteContent) {
      const prevLocal = useLocalNotes();
      const updatedNotes = prevLocal.map(n => {
        if (note.name === n.name) {
          console.log("success");
          return { ...n, content: noteContent };
        }
        return n;
      });
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNote({ name: note.name, content: noteContent });
      setIsEditing(false);
    }
  }

  function handleSave(): void {
    if (note) return editFile();
    addFile();
  }

  return (
    <div className="container">
      <form className="d-flex flex-column">
        {note ? (
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
            {note.name}
          </h2>
        ) : (
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
            {noTitle && <h4>Title is required!</h4>}
          </>
        )}
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
