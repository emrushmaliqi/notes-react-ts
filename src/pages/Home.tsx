import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faFolderPlus,
  faFileMedical,
  faPencil,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import FolderCard from "../components/FolderCard";
import NoteCard from "../components/NoteCard";
import { useFolderDelete, useLocalNotes, useNoteDelete } from "../hooks";
import { NoteType } from "../Types";

interface Props {
  folders: string[];
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
  setFolders: (folders: string[]) => void;
}

export default function Home({ folders, notes, setFolders, setNotes }: Props) {
  const [noteEditing, setNoteEditing] = useState(false);
  const [folderEditing, setFolderEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeElement, setActiveElement] = useState<NoteType | string | null>(
    null
  );
  function handleClose() {
    setShowModal(false);
    setActiveElement(null);
  }

  function handleShowModal(note: NoteType | string) {
    setActiveElement(note);
    setShowModal(true);
  }
  return (
    <>
      <div className="container mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="my-5">Folders</h2>
          <div className="d-flex gap-3">
            <Link to={"/newfolder"} style={{ alignSelf: "flex-start" }}>
              <FontAwesomeIcon
                icon={faFolderPlus}
                style={{ fontSize: "1.6em", color: "black" }}
              />
            </Link>

            {folderEditing ? (
              <FontAwesomeIcon
                icon={faXmark}
                style={{ fontSize: "26px", cursor: "pointer" }}
                onClick={() => setFolderEditing(false)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faPencil}
                style={{ fontSize: "22px", cursor: "pointer" }}
                onClick={() => setFolderEditing(true)}
              />
            )}
          </div>
        </div>
        <div className="d-flex flex-wrap gap-5">
          {folders &&
            folders.map(folder => (
              <div className="position-relative" key={folder}>
                <FolderCard
                  key={folder}
                  folder={folder}
                  notesCount={
                    notes.filter(note => note.folder === folder).length
                  }
                />
                {folderEditing && (
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    onClick={() => handleShowModal(folder)}
                    style={{
                      fontSize: "22px",
                      position: "absolute",
                      backgroundColor: "white",
                      right: -10,
                      top: 5,
                      borderRadius: "100%",
                      zIndex: 1,
                      cursor: "pointer",
                    }}
                  />
                )}
              </div>
            ))}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="my-5">Notes</h2>
          <div className="d-flex gap-3">
            <Link to={"/newfile"}>
              <FontAwesomeIcon
                icon={faFileMedical}
                style={{ fontSize: "1.5em", color: "black" }}
              />
            </Link>
            {noteEditing ? (
              <FontAwesomeIcon
                icon={faXmark}
                style={{ fontSize: "26px", cursor: "pointer" }}
                onClick={() => setNoteEditing(false)}
              />
            ) : (
              <FontAwesomeIcon
                icon={faPencil}
                style={{ fontSize: "22px", cursor: "pointer" }}
                onClick={() => setNoteEditing(true)}
              />
            )}
          </div>
        </div>
        <div className="d-flex flex-wrap gap-4 my-4">
          {notes &&
            notes
              .filter(note => note.folder === undefined)
              .map(note => (
                <div key={note.name} className="position-relative">
                  {noteEditing && (
                    <FontAwesomeIcon
                      icon={faXmarkCircle}
                      onClick={() => handleShowModal(note)}
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
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Delete{" "}
            {typeof activeElement == "string"
              ? `Folder ${activeElement}`
              : `Note ${activeElement?.name}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Press Save Changes to delete Note</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (activeElement) {
                if (typeof activeElement == "string") {
                  setFolders(useFolderDelete(activeElement));
                  setNotes(useLocalNotes());
                } else {
                  setNotes(useNoteDelete(activeElement.name));
                }
              }
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
