import { NoteType } from "./Types";

export function useLocalNotes(): NoteType[] {
  const localData = localStorage.getItem("notes");
  if (localData) return JSON.parse(localData);
  return [];
}

export function useLocalFolders(): string[] {
  const localData = localStorage.getItem("folders");
  if (localData) return JSON.parse(localData);
  return [];
}

export function useNoteDelete(noteName: string) {
  const prevNotes = useLocalNotes();
  const notes = prevNotes.filter(note => note.name !== noteName);
  localStorage.setItem("notes", JSON.stringify(notes));
  return notes;
}

export function useFolderDelete(folder: string) {
  const prevNotes = useLocalNotes();
  const prevFolders = useLocalFolders();
  const notes = prevNotes.filter(note => note.folder != folder);
  const folders = prevFolders.filter(f => f != folder);
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem("folders", JSON.stringify(folders));
  return folders;
}
