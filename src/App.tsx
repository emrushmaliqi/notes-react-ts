import { Route, Routes, useLocation } from "react-router";
import { Suspense, lazy, useState, useEffect } from "react";
import Navigation from "./layout/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import NotesPage from "./pages/NotesPage";
import { NoteType } from "./Types";
import CreateFile from "./components/CreateFile";

const Home = lazy(() => import("./pages/Home"));
const Note = lazy(() => import("./components/Note"));
const Folder = lazy(() => import("./components/Folder"));
const CreateFolder = lazy(() => import("./components/CreateFolder"));

function App() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const location = useLocation();
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [folders, setFolders] = useState<string[]>([]);

  const [activeFolder, setActiveFolder] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    const localFolders = localStorage.getItem("folders");
    const localNotes = localStorage.getItem("notes");
    if (localFolders) setFolders(JSON.parse(localFolders));
    if (localNotes) setNotes(JSON.parse(localNotes));
  }, []);

  useEffect(() => {
    setIsNavOpen(false);
    if (location.pathname.startsWith("/folders/")) {
      const folderName = location.pathname
        .replace("/folders/", "")
        .replaceAll("%20", " ");
      setActiveFolder(folders.find(folder => folder == folderName));
    } else {
      setActiveFolder(undefined);
    }
  }, [location]);
  return (
    <>
      <Navigation
        isOpen={isNavOpen}
        setIsOpen={setIsNavOpen}
        activeFolder={activeFolder}
        folders={folders}
      />
      <Suspense fallback={<h1 style={{ marginLeft: "400px" }}>Loading...</h1>}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                folders={folders}
                notes={notes}
                setNotes={notes => setNotes(notes)}
                setFolders={folders => setFolders(folders)}
              />
            }
          />
          <Route
            path="/folders/:folder"
            element={
              <Folder
                folder={activeFolder}
                notes={notes.filter(note => note.folder == activeFolder)}
              />
            }
          />
          <Route path="/newfolder" element={<CreateFolder />} />
          <Route
            path="/newfile"
            element={<CreateFile setNotes={setNotes} notes={notes} />}
          />
          <Route
            path="/note/:note"
            element={<Note notes={notes} setNotes={setNotes} />}
          />
          <Route path="/notes" element={<NotesPage notes={notes} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
