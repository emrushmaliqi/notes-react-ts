import { Route, Routes, useLocation, Navigate } from "react-router";
import { Suspense, lazy, useState, useEffect } from "react";
import Navigation from "./layout/Navigation";
import SpinnerElement from "./components/SpinnerElement";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/authHooks";

const NotesPage = lazy(() => import("./pages/NotesPage"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Note = lazy(() => import("./components/Note"));
const Folder = lazy(() => import("./components/Folder"));
const CreateFolder = lazy(() => import("./components/CreateFolder"));
const CreateNote = lazy(() => import("./components/CreateNote"));

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user } = useAuthContext();
  const location = useLocation();
  useEffect(() => {
    if (isNavOpen) setIsNavOpen(false);
  }, [location]);

  return (
    <>
      {user && (
        <Navigation
          isOpen={isNavOpen}
          setIsOpen={state => setIsNavOpen(state)}
        />
      )}
      <Suspense
        fallback={
          <div style={{ height: "100vh" }}>
            <SpinnerElement />
          </div>
        }
      >
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" replace={true} />}
          />
          {user && (
            <>
              <Route path="/folders/:folder" element={<Folder />} />
              <Route path="/newfolder" element={<CreateFolder />} />
              <Route path="/newnote" element={<CreateNote />} />
              <Route path="/note/:note" element={<Note />} />
              <Route path="/notes" element={<NotesPage />} />
            </>
          )}
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace={true} />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" replace={true} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
