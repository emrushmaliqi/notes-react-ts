import { NoteType } from "../Types";

function setLocal<T>(key: string, value: T): T {
  localStorage.setItem(key, JSON.stringify(value));
  return value;
}

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

export const useNoteDelete = (me: string) =>
  setLocal(
    "notes",
    useLocalNotes().filter(n => n.title !== me)
  );

export function useFolderDelete(folder: string): string[] {
  setLocal(
    "notes",
    useLocalNotes().filter(n => n.folder != folder)
  );
  return setLocal(
    "folders",
    useLocalFolders().filter(f => f != folder)
  );
}
