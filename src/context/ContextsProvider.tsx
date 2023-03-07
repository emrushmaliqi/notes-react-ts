import { ReactNode } from "react";
import { AuthContextProvider } from "./AuthContext";
import { FoldersContextProvider } from "./FoldersContext";
import { NotesContextProvider } from "./NotesContext";

export const ContextsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
      <FoldersContextProvider>
        <NotesContextProvider>{children}</NotesContextProvider>
      </FoldersContextProvider>
    </AuthContextProvider>
  );
};
