import { NoteType } from "./Types";

export function useLocalNotes(): NoteType[] {
  const localData = localStorage.getItem("notes");
  if (localData) return JSON.parse(localData);
  return [];
}

export function useNoteDelete(noteName: string) {
  const prevNotes = useLocalNotes();
  const notes = prevNotes.filter(note => note.name !== noteName);
  localStorage.setItem("notes", JSON.stringify(notes));
  return notes;
}
