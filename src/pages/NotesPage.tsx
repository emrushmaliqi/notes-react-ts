import NoteCard from "../components/NoteCard";
import { faFileMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { NoteType } from "../Types";
import { useNotesContext, useSetNotes } from "../hooks/noteHooks";
import { useEffect } from "react";

export default function NotesPage() {
  const { notes, dispatch } = useNotesContext();

  useEffect(() => {
    useSetNotes(dispatch, true);
  }, [dispatch]);

  return (
    <div className="container my-4">
      <div className="d-flex gap-4 justify-content-end w-full">
        <Link to={"/newnote"}>
          <FontAwesomeIcon
            icon={faFileMedical}
            style={{ fontSize: "1.5em", marginBottom: "-40px" }}
          />
        </Link>
      </div>
      <h2 className="text-center">All Notes</h2>
      <div className="mt-5 d-flex flex-wrap gap-4">
        {notes.map(note => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>
    </div>
  );
}
