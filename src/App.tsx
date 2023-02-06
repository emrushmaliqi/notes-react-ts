import { Route, Routes, useLocation } from "react-router";
import {
  Suspense,
  lazy,
  useState,
  useEffect,
  createContext,
  useContext,
} from "react";
import Navigation from "./layout/Navigation";
import NotFoundPage from "./pages/NotFoundPage";
import data from "./data.json";
import { notesContext } from "./Context/notesContext";
import NotesPage from "./pages/NotesPage";
import { FolderType } from "./Types";

const Home = lazy(() => import("./pages/Home"));
const Note = lazy(() => import("./components/Note"));
const Folder = lazy(() => import("./components/Folder"));
const CreateFolder = lazy(() => import("./components/CreateFolder"));

function App() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const location = useLocation();
  const notesData = useContext(notesContext);
  const [activeFolder, setActiveFolder] = useState<FolderType | undefined>(
    undefined
  );

  useEffect(() => {
    setIsNavOpen(false);
    if (location.pathname.startsWith("/folders/")) {
      const folderName = location.pathname
        .replace("/folders/", "")
        .replaceAll("%20", " ");
      setActiveFolder(
        notesData.folders.find(folder => folder.name == folderName)
      );
    }
  }, [location]);
  return (
    <>
      <notesContext.Provider value={data}>
        <Navigation
          isOpen={isNavOpen}
          setIsOpen={setIsNavOpen}
          activeFolder={activeFolder}
        />
        <Suspense
          fallback={<h1 style={{ marginLeft: "400px" }}>Loading...</h1>}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/folders/:folder"
              element={<Folder folder={activeFolder} />}
            />
            <Route path="/newfolder" element={<CreateFolder />} />
            <Route path="/note/:note" element={<Note />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </notesContext.Provider>
    </>
  );
}

export default App;
