import NoteCard from "../components/NoteCard";
import { faFolderPlus, faFileMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { NoteType } from "../Types";

export default function NotesPage({ notes }: { notes: NoteType[] }) {
  return (
    <div className="container mt-5">
      <div className="d-flex gap-4 justify-content-end w-full">
        <Link to={"/newfile"}>
          <FontAwesomeIcon icon={faFileMedical} style={{ fontSize: "1.5em" }} />
        </Link>
      </div>
      <h2 className="text-center">All Notes</h2>
      <div className="mt-5 d-flex flex-wrap gap-4">
        {notes.map(note => (
          <NoteCard key={note.name + note.content} note={note} />
        ))}
      </div>
    </div>
  );
}
