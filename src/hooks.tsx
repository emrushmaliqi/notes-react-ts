import { NoteType } from "./Types";

export function useLocalNotes(): NoteType[] {
  const localData = localStorage.getItem("notes");
  if (localData) return JSON.parse(localData);
  return [];
}
