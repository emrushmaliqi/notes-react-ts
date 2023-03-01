import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";
import { useLocalFolders } from "../hooks/UseLocal";

interface Props {
  folders: string[];
  setFolders: React.Dispatch<React.SetStateAction<string[]>>;
}

enum Error {
  empty = "Folder Name required!",
  exists = "Folder already exists!",
}

export default function CreateFolder({ folders, setFolders }: Props) {
  const [isWrong, setIsWrong] = useState<Error | null>(null);
  const folderRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  function handleCreate(e: React.SyntheticEvent): void {
    e.preventDefault();
    if (folderRef.current) {
      const value = folderRef.current.value;
      if (value.trim()) {
        if (folders.includes(value)) {
          return setIsWrong(Error.exists);
        }
        localStorage.setItem("folders", JSON.stringify([value, ...folders]));
        setFolders(useLocalFolders());
        return navigate(`/folders/${value}`, { replace: true });
      }
      setIsWrong(Error.empty);
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
        {isWrong && isWrong}
        <Button onClick={handleCreate} style={{ width: "50%", height: 50 }}>
          Create
        </Button>
      </form>
    </div>
  );
}
