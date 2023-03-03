import axios from "axios";
import { FolderType, ResponseProps } from "../Types";
import {
  FoldersContext,
  FoldersAction,
  FoldersActionKind,
} from "../context/FoldersContext";
import { useContext } from "react";

export const useFoldersContext = () => {
  const context = useContext(FoldersContext);

  if (!context.dispatch)
    throw Error("useFoldersContext must be used inside its Provider");

  return context;
};

export const useSetFolders = async (
  dispatch: React.Dispatch<FoldersAction> | null,
  folder: boolean = false
) => {
  const { status, data }: ResponseProps<FolderType[]> = await axios.get(
    `${folder ? "." : ""}./api/folders/`
  );
  if (status === 200 && dispatch) {
    dispatch({
      type: FoldersActionKind.SET,
      payload: data,
    });
  }
};

export const useCreateFolder = async (
  dispatch: React.Dispatch<FoldersAction> | null,
  folder: FolderType
) => {
  const { status, data }: ResponseProps<FolderType> = await axios.post(
    "api/folders",
    folder
  );

  if (status === 201 && dispatch) {
    dispatch({ type: FoldersActionKind.CREATE, payload: [data] });
  }
};

export const useUpdateFolder = async (
  dispatch: React.Dispatch<FoldersAction> | null,
  { _id, notes }: Pick<FolderType, "_id" | "notes">
) => {
  const { status, data }: ResponseProps<FolderType> = await axios.patch(
    `../api/folders/${_id}`,
    {
      notes,
    }
  );
  if (status === 200 && dispatch) {
    dispatch({ type: FoldersActionKind.UPDATE, payload: [{ ...data, notes }] });
  }
};

export const useDeleteFolder = async (
  dispatch: React.Dispatch<FoldersAction> | null,
  folderId: FolderType["_id"]
) => {
  const { status, data }: ResponseProps<FolderType> = await axios.delete(
    `api/folders/${folderId}`
  );

  if (status == 202 && dispatch) {
    dispatch({
      type: FoldersActionKind.DELETE,
      payload: [data],
    });
  }
};
