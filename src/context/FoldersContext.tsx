import { createContext, Dispatch, ReactNode, Reducer, useReducer } from "react";
import { FolderType } from "../Types";

export enum FoldersActionKind {
  SET = "SET",
  CREATE = "CREATE",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
}

export interface FoldersAction {
  type: FoldersActionKind;
  payload: FolderState["folders"];
}

interface FolderState {
  folders: FolderType[];
}

export const FoldersContext = createContext<{
  folders: FolderState["folders"];
  dispatch: Dispatch<FoldersAction> | null;
}>({ folders: [], dispatch: null });

export const foldersReducer: Reducer<FolderState, FoldersAction> = (
  state: FolderState,
  { type, payload }: FoldersAction
) => {
  switch (type) {
    case FoldersActionKind.SET:
      return { folders: payload };
    case FoldersActionKind.CREATE:
      return { folders: [...payload, ...state.folders] };
    case FoldersActionKind.UPDATE:
      const [updatedFolder] = payload;
      return {
        folders: state.folders.map(f =>
          f._id === updatedFolder._id ? updatedFolder : f
        ),
      };
    case FoldersActionKind.DELETE:
      const [{ _id }] = payload;
      return {
        folders: state.folders.filter(f => f._id !== _id),
      };
    default:
      return state;
  }
};

export const FoldersContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(foldersReducer, { folders: [] });
  return (
    <FoldersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FoldersContext.Provider>
  );
};
