import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFileMedical,
  faFolderPlus,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styleModules/navigation.module.css";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useFoldersContext, useSetFolders } from "../hooks/folderHooks";
import { useEffect } from "react";
import { useAuthContext, useLogout } from "../hooks/authHooks";
import Button from "react-bootstrap/Button";
import SpinnerElement from "../components/SpinnerElement";

interface Props {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

export default function Navigation({ isOpen, setIsOpen }: Props) {
  const { folders } = useFoldersContext();
  const { user } = useAuthContext();
  const logout = useLogout();
  const { isLoading, setFolders } = useSetFolders();

  // useEffect(() => {
  //   if (folders.length === 0) setFolders();
  // }, [location.pathname]);

  useEffect(() => {
    setFolders();
  }, [user?.email]);

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
          <Offcanvas.Title className="w-100 px-2 d-flex justify-content-around">
            <span>{user?.email}</span>
            <Button onClick={logout}>Log out</Button>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link
            to={"/notes"}
            style={{ fontSize: "22px", fontWeight: "bold", marginTop: "80px" }}
          >
            All Notes
          </Link>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8em",
              marginTop: "40px",
            }}
          >
            <Link to={"/newfolder"} style={{ alignSelf: "flex-start" }}>
              <FontAwesomeIcon
                icon={faFolderPlus}
                style={{ fontSize: "1.6em" }}
              />
            </Link>
            <Link to={"/newnote"}>
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
            Folders
          </Link>

          {isLoading ? (
            <SpinnerElement />
          ) : (
            folders &&
            folders.map(
              folder =>
                folder._id && (
                  <Link
                    key={folder._id}
                    to={`folders/${folder._id}`}
                    onMouseEnter={e =>
                      e.currentTarget.classList.add("border-dark")
                    }
                    onMouseLeave={e =>
                      e.currentTarget.classList.remove("border-dark")
                    }
                    className={`${styles.folders} ${
                      location.pathname.endsWith(folder._id) && "text-black"
                    } border-primary`}
                  >
                    {folder.name}
                  </Link>
                )
            )
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
