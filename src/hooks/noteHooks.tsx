import axios from "axios";
import { FolderType, NoteType, ResponseProps } from "../Types";
import {
  NotesAction,
  NotesActionKind,
  NotesContext,
} from "../context/NotesContext";
import { useContext } from "react";
import { useLocation } from "react-router";

export const useNotesContext = () => {
  const context = useContext(NotesContext);

  if (!context.dispatch)
    throw Error("useNotesContext must be used inside an NotesContextProvider");

  return context;
};

export const useSetNotes = async (
  dispatch: React.Dispatch<NotesAction> | null,
  // if note is set to false it will get only notes that are not in folders,
  // if it is set to true it will get all notes including folder Notes,
  // if it is set to a string (note._id) it will get one Note
  note: boolean | NoteType["_id"] = false
): Promise<boolean> => {
  const url = () => {
    if (note === true) return "api/notes/withFolderNotes";
    if (typeof note === "string") return `../api/notes/${note}`;
    return "api/notes";
  };
  const { status, data }: ResponseProps<NoteType[] | NoteType> =
    await axios.get(url());
  if (status === 200 && dispatch) {
    dispatch({
      type: NotesActionKind.SET,
      payload: Array.isArray(data) ? data : [data],
    });
    return false;
  }
  return true;
};

export const useCreateNote = async (
  dispatch: React.Dispatch<NotesAction> | null,
  note: NoteType
) => {
  const { status, data }: ResponseProps<NoteType> = await axios.post(
    `${location.pathname !== "/" ? "../" : ""}api/notes`,
    note
  );

  if (status === 201 && dispatch) {
    dispatch({ type: NotesActionKind.CREATE, payload: [data] });
  }
};

export const useUpdateNote = async (
  dispatch: React.Dispatch<NotesAction> | null,
  { _id, content, title }: Pick<NoteType, "_id" | "content" | "title">
) => {
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
};

export const useDeleteNote = async (
  dispatch: React.Dispatch<NotesAction> | null,
  noteId: NoteType["_id"]
) => {
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

export const useSetFolderNotes = async (
  dispatch: React.Dispatch<NotesAction> | null,
  folderId: FolderType["_id"] | undefined
): Promise<boolean> => {
  if (folderId === undefined) return true;
  const { status, data }: ResponseProps<NoteType[]> = await axios.get(
    `../api/notes/folder/${folderId}`
  );

  if (status === 200 && dispatch) {
    dispatch({ type: NotesActionKind.SET, payload: data });
    return false;
  }
  return true;
};
