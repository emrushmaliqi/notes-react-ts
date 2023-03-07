export interface NoteType {
  _id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  folder?: FolderType["_id"];
}

export interface FolderType {
  _id?: string;
  name: string;
  notes: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserType {
  email: string;
  password: string;
}

export interface UserWithToken {
  email: string;
  token: string;
}

export interface ResponseProps<T> {
  status: number;
  data: T;
}
