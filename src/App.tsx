import { Route, Routes, useLocation } from "react-router";
import { Suspense, lazy, useState, useEffect } from "react";
import { NoteType } from "./Types";
import Navigation from "./layout/Navigation";

const Home = lazy(() => import("./pages/Home"));
const NotesPage = lazy(() => import("./pages/NotesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Note = lazy(() => import("./components/Note"));
const Folder = lazy(() => import("./components/Folder"));
const CreateFolder = lazy(() => import("./components/CreateFolder"));
const CreateNote = lazy(() => import("./components/CreateNote"));

function App() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const location = useLocation();
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [folders, setFolders] = useState<string[]>([]);

  useEffect(() => {
    const localFolders = localStorage.getItem("folders");
    const localNotes = localStorage.getItem("notes");
    if (localFolders) setFolders(JSON.parse(localFolders));
    if (localNotes) setNotes(JSON.parse(localNotes));
  }, []);

  useEffect(() => setIsNavOpen(false), [location]);

  return (
    <>
      <Navigation
        isOpen={isNavOpen}
        setIsOpen={setIsNavOpen}
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
              <Folder folders={folders} setNotes={setNotes} allNotes={notes} />
            }
          />
          <Route
            path="/newfolder"
            element={<CreateFolder folders={folders} setFolders={setFolders} />}
          />
          <Route
            path="/newnote"
            element={<CreateNote setNotes={setNotes} notes={notes} />}
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
