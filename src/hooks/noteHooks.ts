import axios from "axios";
import { FolderType, NoteType, ResponseProps } from "../Types";
import { NotesActionKind, NotesContext } from "../context/NotesContext";
import { useContext, Dispatch, useState } from "react";

export const useNotesContext = () => {
  const context = useContext(NotesContext);

  if (!context.dispatch)
    throw Error("useNotesContext must be used inside an NotesContextProvider");

  return context;
};

export const useSetNotes = () => {
  const [isLoading, setIsloading] = useState(false);
  const { dispatch } = useNotesContext();

  // if note is set to false it will get only notes that are not in folders,
  // if it is set to true it will get all notes including folder Notes,
  // if it is set to a string (note._id) it will get one Note
  const setNotes = async (note: boolean | NoteType["_id"] = false) => {
    setIsloading(true);
    const url = () => {
      if (note === true) return "api/notes/withFolderNotes";
      if (typeof note === "string") return `../api/notes/${note}`;
      return "api/notes";
    };
    const { status, data }: ResponseProps<NoteType[] | NoteType> =
      await axios.get(url());

    if (status === 200 && dispatch)
      dispatch({
        type: NotesActionKind.SET,
        payload: Array.isArray(data) ? data : [data],
      });

    setIsloading(false);
  };

  return { isLoading, setNotes };
};

export const useCreateNote = () => {
  const { dispatch } = useNotesContext();
  const [isLoading, setIsLoading] = useState<boolean>();

  const createNote = async (note: NoteType) => {
    setIsLoading(true);
    const { status, data }: ResponseProps<NoteType> = await axios.post(
      `${location.pathname !== "/" ? "../" : ""}api/notes`,
      note
    );

    if (status === 201 && dispatch) {
      dispatch({ type: NotesActionKind.CREATE, payload: [data] });
    }
    setIsLoading(false);
  };

  return { isLoading, createNote };
};

export const useUpdateNote = () => {
  const { dispatch } = useNotesContext();
  const [isLoading, setIsLoading] = useState(false);

  const updateNote = async ({
    _id,
    content,
    title,
  }: Pick<NoteType, "_id" | "content" | "title">) => {
    setIsLoading(true);
    const { status, data }: ResponseProps<NoteType> = await axios.patch(
      `../api/notes/${_id}`,
      {
        content,
        title,
      }
    );

    if (status === 200 && dispatch) {
      dispatch({
        type: NotesActionKind.UPDATE,
        payload: [{ ...data, content, title }],
      });
    }
    setIsLoading(false);
  };

  return { updateNote, isLoading };
};

export const useDeleteNote = () => {
  const { dispatch } = useNotesContext();

  const deleteNote = async (noteId: NoteType["_id"]) => {
    const { status, data }: ResponseProps<NoteType> = await axios.delete(
      `${noteId ? "../" : ""}api/notes/${noteId}`
    );

    if (status === 202 && dispatch) {
      dispatch({
        type: NotesActionKind.DELETE,
        payload: [data],
      });
    }
  };

  return deleteNote;
};

export const useSetFolderNotes = () => {
  const { dispatch } = useNotesContext();
  const [isLoading, setIsLoading] = useState(false);

  const setFolderNotes = async (folderId: FolderType["_id"] | undefined) => {
    setIsLoading(true);
    if (folderId === undefined) {
      return setIsLoading(false);
    }
    const { status, data }: ResponseProps<NoteType[]> = await axios.get(
      `../api/notes/folder/${folderId}`
    );

    if (status === 200 && dispatch) {
      dispatch({ type: NotesActionKind.SET, payload: data });
    }
    setIsLoading(false);
  };

  return { isLoading, setFolderNotes };
};
