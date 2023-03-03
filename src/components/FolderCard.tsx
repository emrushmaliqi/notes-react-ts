import { faFolder } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { FolderType } from "../Types";

interface Props {
  folder: FolderType;
}

export default function FolderCard({ folder }: Props) {
  return (
    <Link
      to={`/folders/${folder._id}`}
      className="d-flex flex-column position-relative"
      style={{
        width: "max-content",
        cursor: "pointer",
        color: "#323232",
      }}
    >
      <FontAwesomeIcon
        icon={faFolder}
        style={{ fontSize: "80px", zIndex: -1 }}
      />
      <span style={{ position: "absolute", top: "10px", left: "10px" }}>
        {folder.notes.length}
      </span>
      <div
        style={{
          position: "absolute",
          top: "30px",
          height: "45px",
          padding: "10px",
          fontSize: "14px",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <span style={{ lineHeight: "1", overflow: "hidden", width: "60px" }}>
          {folder.name}
        </span>
      </div>
    </Link>
  );
}
