import { createContext, Dispatch, ReactNode, Reducer, useReducer } from "react";
import { NoteType } from "../Types";

export enum NotesActionKind {
  SET = "SET",
  CREATE = "CREATE",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
  SETFOLDERNOTES = "SETFOLDERNOTES",
}

export interface NotesAction {
  type: NotesActionKind;
  payload: NoteState["notes"];
}

interface NoteState {
  notes: NoteType[];
}

export const NotesContext = createContext<{
  notes: NoteState["notes"];
  dispatch: Dispatch<NotesAction> | null;
}>({ notes: [], dispatch: null });

export const notesReducer: Reducer<NoteState, NotesAction> = (
  state: NoteState,
  { type, payload }: NotesAction
) => {
  switch (type) {
    case NotesActionKind.SET:
      return { notes: payload };
    case NotesActionKind.CREATE:
      return { notes: [...payload, ...state.notes] };
    case NotesActionKind.UPDATE:
      const [updatedNote] = payload;
      return {
        notes: state.notes.map(note =>
          note._id === updatedNote._id ? updatedNote : note
        ),
      };
    case NotesActionKind.DELETE:
      const [{ _id }] = payload;
      return {
        notes: state.notes.filter(note => note._id !== _id),
      };
    default:
      return state;
  }
};

export const NotesContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(notesReducer, { notes: [] });
  return (
    <NotesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotesContext.Provider>
  );
};
