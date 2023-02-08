import { faFolderPlus, faFileMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import FolderCard from "../components/FolderCard";
import NoteCard from "../components/NoteCard";
import { NoteType } from "../Types";

interface Props {
  folders: string[];
  notes: NoteType[];
}

export default function Home({ folders, notes }: Props) {
  return (
    <div className="container mt-5">
      <div className="d-flex gap-4 justify-content-end w-full">
        <Link to={"/newfolder"} style={{ alignSelf: "flex-start" }}>
          <FontAwesomeIcon icon={faFolderPlus} style={{ fontSize: "1.6em" }} />
        </Link>
        <Link to={"/newfile"}>
          <FontAwesomeIcon icon={faFileMedical} style={{ fontSize: "1.5em" }} />
        </Link>
      </div>
      <h2 className="my-5">Folders</h2>
      <div className="d-flex flex-wrap gap-5">
        {folders &&
          folders.map(folder => (
            <FolderCard
              key={folder}
              folder={folder}
              notesCount={notes.filter(note => note.folder === folder).length}
            />
          ))}
      </div>
      <h2 className="my-5">Notes</h2>
      <div className="mt-5 d-flex flex-wrap gap-4">
        {notes &&
          notes
            .filter(note => note.folder === undefined)
            .map(note => <NoteCard key={note.name} note={note} />)}
      </div>
    </div>
  );
}
