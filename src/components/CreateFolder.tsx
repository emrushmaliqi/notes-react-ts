import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import {
  useCreateFolder,
  useFoldersContext,
  useSetFolders,
} from "../hooks/folderHooks";

export default function CreateFolder() {
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const folderRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { dispatch } = useFoldersContext();

  function handleCreate(e: React.SyntheticEvent): void {
    e.preventDefault();
    if (folderRef.current) {
      const name = folderRef.current.value;
      if (name.trim())
        useCreateFolder(dispatch, { name, notes: [] }).then(() =>
          navigate("/", { replace: true })
        );
      else setIsWrong(true);
    }
  }
  return (
    <div className="mt-5 container d-flex flex-column align-items-center gap-5">
      <h2 className="text-center">Folder Name</h2>
      <form
        onSubmit={e => e.preventDefault()}
        className="d-flex flex-column gap-3 align-items-center"
        style={{ width: "100%" }}
      >
        <input
          ref={folderRef}
          type="text"
          className="p-2"
          style={{ width: "80%", fontSize: 22 }}
        />
        {isWrong && <h5>Name is required!</h5>}
        <Button onClick={handleCreate} style={{ width: "50%", height: 50 }}>
          Create
        </Button>
      </form>
    </div>
  );
}
