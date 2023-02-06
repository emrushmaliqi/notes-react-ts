// export type NoteType = {
//   note: boolean;
//   name: string;
//   content: string;
// };
// export type FolderType = {
//   note: boolean;
//   name: string;
//   notes: { name: string; content: string }[];
// };

export interface NoteType {
  name: string;
  content: string;
}
export interface FolderType {
  name: string;
  notes: NoteType[];
}
export interface DataType {
  folders: FolderType[];
  notes: NoteType[];
}
