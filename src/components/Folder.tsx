import {
  faFileMedical,
  faPencil,
  faXmark,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import { useFolderDelete, useNoteDelete } from "../hooks";
import { NoteType } from "../Types";
import NoteCard from "./NoteCard";

interface Props {
  folder: string | undefined;
  notes: NoteType[];
  setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
}

export default function Folder({ folder, notes, setNotes }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeNote, setActiveNote] = useState<NoteType | null>(null);
  const [showModal, setShowModal] = useState(false);

  function handleClose() {
    setShowModal(false);
  }

  function handleDelete() {
    if (activeNote) setNotes(useNoteDelete(activeNote.name));
    handleClose();
  }

  function handleShowModal(note: NoteType) {
    setActiveNote(note);
    setShowModal(true);
  }

  if (folder === undefined) {
    return <div>Folder doesn't exist</div>;
  }

  return (
    <>
      <div className="container mt-3">
        <div className="d-flex gap-4 justify-content-end w-full">
          <Link to={"/newfile"} state={{ folder: folder }}>
            <FontAwesomeIcon
              icon={faFileMedical}
              style={{ fontSize: "1.5em", marginBottom: "-40px" }}
            />
          </Link>
        </div>
        <div
          className="d-flex justify-content-between"
          style={{ height: "120px" }}
        >
          <h1 className="text-center align-self-start">Folders</h1>
          {isEditing ? (
            <FontAwesomeIcon
              icon={faXmark}
              style={{
                fontSize: "26px",
                cursor: "pointer",
                marginTop: "1px",
                alignSelf: "flex-end",
              }}
              onClick={() => setIsEditing(false)}
            />
          ) : (
            <FontAwesomeIcon
              icon={faPencil}
              style={{
                fontSize: "22px",
                cursor: "pointer",
                marginTop: "1px",
                alignSelf: "flex-end",
              }}
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
        <div className="mt-5 d-flex flex-wrap gap-4">
          {notes.filter(n => n.folder == folder).length == 0 && (
            <Link
              className="mx-auto fs-3"
              style={{ marginTop: "12%" }}
              to="/newfile"
              state={{ folder: folder }}
            >
              Add new file
            </Link>
          )}
          {notes.map(note => (
            <div className="position-relative" key={note.name}>
              {isEditing && (
                <FontAwesomeIcon
                  icon={faXmarkCircle}
                  onClick={() => handleShowModal(note)}
                  style={{
                    fontSize: "22px",
                    position: "absolute",
                    right: -11,
                    top: -11,
                    zIndex: 1,
                    cursor: "pointer",
                  }}
                />
              )}
              <NoteCard note={note} />
            </div>
          ))}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Press Save Changes to delete Note</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
