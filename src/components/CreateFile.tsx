import { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import { useLocalNotes } from "../hooks";
import { NoteType } from "../Types";
import { useNavigate } from "react-router";

interface Props {
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
  notes?: NoteType[];
  note?: NoteType;
  folder?: string;
  setIsEditing?: (state: boolean) => void;
  setNote?: (state: NoteType) => void;
}

export default function CreateFile({
  setNotes,
  notes,
  note,
  folder,
  setIsEditing,
  setNote,
}: Props) {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (note) {
      if (titleRef.current) titleRef.current.value = note.name;
      if (noteRef.current) noteRef.current.value = note.content;
    }
  }, []);

  function handleSave(): void {
    const data = useLocalNotes();
    if (titleRef.current && noteRef.current) {
      const inputNote: NoteType = {
        name: titleRef.current.value,
        content: noteRef.current.value,
      };
      if (notes && notes.find(note => note.name == inputNote.name)) {
        const date = new Date();
        inputNote.name += " - " + date.toLocaleString();
      }
      localStorage.setItem("notes", JSON.stringify([inputNote, ...data]));
      setNotes(useLocalNotes());
      navigate("/", { replace: true });
    } else if (note && setIsEditing && setNote && noteRef.current) {
      const prevLocal = useLocalNotes();
      const updatedNotes = prevLocal.map(n => {
        if (note.name === n.name && noteRef.current) {
          console.log("success");
          return { ...n, content: noteRef.current.value };
        }
        return n;
      });
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNote({ name: note.name, content: noteRef.current.value });
      setIsEditing(false);
    }
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
        )}
        <textarea
          ref={noteRef}
          placeholder="Note"
          style={{
            display: "flex",
            alignItems: "flex-start",
            verticalAlign: "text-top",
            width: "100%",
            height: "80vh",
            outline: "none",
            padding: "1em 0",
            resize: "none",
            border: "none",
            lineHeight: "1.2",
          }}
        ></textarea>
        <div style={{ width: "33%", alignSelf: "flex-end" }}>
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
