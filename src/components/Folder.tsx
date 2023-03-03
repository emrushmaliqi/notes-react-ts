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
import { Link, useParams, useLocation } from "react-router-dom";
import {
  useFoldersContext,
  useSetFolders,
  useUpdateFolder,
} from "../hooks/folderHooks";
import {
  useDeleteNote,
  useNotesContext,
  useSetFolderNotes,
} from "../hooks/noteHooks";
import { FolderType, NoteType } from "../Types";
import NoteCard from "./NoteCard";
import SpinnerElement from "./SpinnerElement";

export default function Folder() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeNote, setActiveNote] = useState<NoteType["_id"]>();
  const [showModal, setShowModal] = useState(false);
  const [folder, setFolder] = useState<FolderType>();
  const params = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const { folders, dispatch: foldersDispatch } = useFoldersContext();
  const { notes, dispatch: notesDispatch } = useNotesContext();

  useEffect(() => {
    setIsLoading(true);
    if (folders.length === 0) useSetFolders(foldersDispatch, true);
  }, [foldersDispatch, location]);

  useEffect(() => {
    setFolder(folders.find(f => f._id === params.folder));
  }, [folders, location]);

  useEffect(() => {
    if (folder)
      useSetFolderNotes(notesDispatch, folder._id).then(res =>
        setIsLoading(res)
      );
  }, [folder]);

  const handleClose = () => setShowModal(false);

  function handleDelete() {
    if (activeNote && folder) useDeleteNote(notesDispatch, activeNote);
    handleClose();
  }

  function handleShowModal(note: NoteType) {
    setActiveNote(note._id);
    setShowModal(true);
  }

  if (folder && folders.length !== 0)
    return (
      <>
        <div className="container mt-3">
          <div className="d-flex gap-4 justify-content-end w-full">
            <Link to={"/newnote"} state={{ folder: folder._id }}>
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
            <h1 className="text-center align-self-start">{folder?.name}</h1>
            {notes.length !== 0 &&
              (isEditing ? (
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
              ))}
          </div>
          <div className="mt-5 d-flex flex-wrap gap-4">
            {isLoading ? (
              <SpinnerElement />
            ) : notes.length == 0 ? (
              <Link
                className="mx-auto fs-3"
                style={{ marginTop: "12%" }}
                to="/newnote"
                state={{ folder: folder }}
              >
                Add new file
              </Link>
            ) : (
              notes.map(note => (
                <div className="position-relative" key={note._id}>
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
              ))
            )}
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
  return <div>Folder doesn't exist</div>;
}
