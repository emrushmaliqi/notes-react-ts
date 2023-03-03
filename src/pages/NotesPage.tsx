import NoteCard from "../components/NoteCard";
import { faFileMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useNotesContext, useSetNotes } from "../hooks/noteHooks";
import { useEffect, useState } from "react";
import SpinnerElement from "../components/SpinnerElement";

export default function NotesPage() {
  const { notes, dispatch } = useNotesContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    useSetNotes(dispatch, true).then(res => setIsLoading(res));
  }, [dispatch]);

  useEffect(() => console.log(notes), [notes]);

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
        {isLoading ? (
          <SpinnerElement />
        ) : (
          notes.map(note => <NoteCard key={note._id} note={note} />)
        )}
      </div>
    </div>
  );
}
