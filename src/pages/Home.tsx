import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faFolderPlus,
  faFileMedical,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import FolderCard from "../components/FolderCard";
import NoteCard from "../components/NoteCard";
import { useNoteDelete } from "../hooks";
import { NoteType } from "../Types";

interface Props {
  folders: string[];
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
  setFolders: (folders: string[]) => void;
}

export default function Home({ folders, notes, setFolders, setNotes }: Props) {
  const [isEditing, setIsEditing] = useState(false);
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
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="my-5">Notes</h2>
        <FontAwesomeIcon
          icon={faPencil}
          style={{ fontSize: "22px", cursor: "pointer" }}
          onClick={() => setIsEditing(prev => !prev)}
        />
      </div>
      <div className="mt-5 d-flex flex-wrap gap-4">
        {notes &&
          notes
            .filter(note => note.folder === undefined)
            .map(note => (
              <div className="position-relative">
                {isEditing && (
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    onClick={() => setNotes(useNoteDelete(note.name))}
                    style={{
                      fontSize: "22px",
                      position: "absolute",
                      backgroundColor: "white",
                      right: -11,
                      top: -11,
                      zIndex: 1,
                      cursor: "pointer",
                    }}
                  />
                )}
                <NoteCard key={note.name} note={note} />
              </div>
            ))}
      </div>
    </div>
  );
}
