import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFileMedical,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styleModules/navigation.module.css";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext, useEffect, useState } from "react";
import { notesContext } from "../Context/notesContext";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeFolder: string | undefined;
  folders: string[];
}

export default function Navigation({
  isOpen,
  setIsOpen,
  activeFolder,
  folders,
}: Props) {
  return (
    <>
      <FontAwesomeIcon
        icon={faBars}
        onClick={() => setIsOpen(true)}
        style={{
          fontSize: "1.75em",
          margin: "1em",
          cursor: "pointer",
          position: "absolute",
          top: 0,
        }}
      />
      <Offcanvas show={isOpen} onHide={() => setIsOpen(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="w-100 text-center">
            <Link to={"/notes"}>All Notes</Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8em",
              marginTop: "100px",
            }}
          >
            <Link to={"/newfolder"} style={{ alignSelf: "flex-start" }}>
              <FontAwesomeIcon
                icon={faFolderPlus}
                style={{ fontSize: "1.6em" }}
              />
            </Link>
            <Link to={"/newfile"}>
              <FontAwesomeIcon
                icon={faFileMedical}
                style={{ fontSize: "1.5em" }}
              />
            </Link>
          </div>
          <Link
            to="/"
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              paddingBottom: "0.75em",
              marginTop: "2em",
            }}
          >
            All Folders
          </Link>
          {folders &&
            folders.map(folder => (
              <Link
                key={folder}
                to={`folders/${folder}`}
                className={`${styles.folders} ${
                  activeFolder == folder ? "text-black" : "border-primary"
                }`}
              >
                {folder}
              </Link>
            ))}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
