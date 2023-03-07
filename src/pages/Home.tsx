import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faFolderPlus,
  faFileMedical,
  faPencil,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import FolderCard from "../components/FolderCard";
import NoteCard from "../components/NoteCard";
import {
  useDeleteNote,
  useNotesContext,
  useSetNotes,
} from "../hooks/noteHooks";
import { FolderType, NoteType } from "../Types";
import { useDeleteFolder, useFoldersContext } from "../hooks/folderHooks";
import SpinnerElement from "../components/SpinnerElement";

export default function Home() {
  const [noteEditing, setNoteEditing] = useState(false);
  const [folderEditing, setFolderEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeNote, setActiveNote] = useState<NoteType | undefined>();
  const [activeFolder, setActiveFolder] = useState<FolderType | undefined>();
  const { isLoading, setNotes } = useSetNotes();
  const { folders } = useFoldersContext();
  const { notes } = useNotesContext();
  const deleteNote = useDeleteNote();
  const deleteFolder = useDeleteFolder();

  useEffect(() => {
    setNotes();
  }, []);

  function handleClose() {
    setShowModal(false);
    if (activeNote) return setActiveNote(undefined);
    setActiveFolder(undefined);
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
              <div className="position-relative" key={folder._id}>
                <FolderCard folder={folder} />
                {folderEditing && (
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    onClick={() => {
                      setActiveFolder(folder);
                      setShowModal(true);
                    }}
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
          {!isLoading && (
            <div className="d-flex gap-3">
              <Link to={"/newnote"}>
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
          )}
        </div>
        <div className="d-flex flex-wrap gap-4 my-4">
          {isLoading ? (
            <SpinnerElement />
          ) : (
            notes &&
            notes.map(note => (
              <div key={note._id} className="position-relative">
                {noteEditing && (
                  <FontAwesomeIcon
                    icon={faXmarkCircle}
                    onClick={() => {
                      setActiveNote(note);
                      setShowModal(true);
                    }}
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
                <NoteCard key={note._id} note={note} />
              </div>
            ))
          )}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Delete{" "}
            {activeFolder
              ? `Folder ${activeFolder.name}`
              : `Note ${activeNote?.title}`}
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
              if (activeFolder) {
                deleteFolder(activeFolder._id);
              } else if (activeNote) {
                deleteNote(activeNote._id);
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
