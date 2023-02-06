import { faFileMedical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { notesContext } from "../Context/notesContext";
import { DataType, FolderType } from "../Types";
import NoteCard from "./NoteCard";

interface Props {
  folder: FolderType | undefined;
}

export default function Folder({ folder }: Props) {
  if (folder === undefined) {
    return <div>Folder doesn't exist</div>;
  }
  return (
    <div className="container mt-5">
      <div className="d-flex gap-4 justify-content-end w-full">
        <Link to={"/newfile"}>
          <FontAwesomeIcon icon={faFileMedical} style={{ fontSize: "1.5em" }} />
        </Link>
      </div>
      <h1 className="text-center">{folder.name}</h1>
      <div className="mt-5 d-flex flex-wrap gap-4">
        {folder.notes.map(note => (
          <NoteCard key={note.name} note={note} />
        ))}
      </div>
    </div>
  );
}
