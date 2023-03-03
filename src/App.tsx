import { Route, Routes, useLocation } from "react-router";
import { Suspense, lazy, useState, useEffect } from "react";
import Navigation from "./layout/Navigation";

const Home = lazy(() => import("./pages/Home"));
const NotesPage = lazy(() => import("./pages/NotesPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Note = lazy(() => import("./components/Note"));
const Folder = lazy(() => import("./components/Folder"));
const CreateFolder = lazy(() => import("./components/CreateFolder"));
const CreateNote = lazy(() => import("./components/CreateNote"));

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (isNavOpen) setIsNavOpen(false);
  }, [location]);

  return (
    <>
      <Navigation isOpen={isNavOpen} setIsOpen={state => setIsNavOpen(state)} />
      <Suspense fallback={<h1 style={{ marginLeft: "400px" }}>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/folders/:folder" element={<Folder />} />
          <Route path="/newfolder" element={<CreateFolder />} />
          <Route path="/newnote" element={<CreateNote />} />
          <Route path="/note/:note" element={<Note />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
