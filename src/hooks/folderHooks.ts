import axios from "axios";
import { FolderType, ResponseProps } from "../Types";
import { FoldersContext, FoldersActionKind } from "../context/FoldersContext";
import { useContext, Dispatch, useState } from "react";
import { useAuthContext } from "./authHooks";
import useConfig from "./useAxiosConfig";

export const useFoldersContext = () => {
  const context = useContext(FoldersContext);

  if (!context.dispatch)
    throw Error("useFoldersContext must be used inside its Provider");

  return context;
};

export const useSetFolders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useFoldersContext();
  const { user } = useAuthContext();

  const setFolders = async () => {
    setIsLoading(true);
    const { status, data }: ResponseProps<FolderType[]> = await axios.get(
      `${location.pathname !== "/" ? "../" : ""}api/folders/`,
      useConfig(user?.token)
    );
    if (status === 200 && dispatch)
      dispatch({
        type: FoldersActionKind.SET,
        payload: data,
      });

    setIsLoading(false);
  };

  return { isLoading, setFolders };
};

export const useCreateFolder = () => {
  const { dispatch } = useFoldersContext();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const createFolder = async (folder: FolderType) => {
    setIsLoading(true);
    const { status, data }: ResponseProps<FolderType> = await axios.post(
      "api/folders",
      folder,
      useConfig(user?.token)
    );

    if (status === 201 && dispatch) {
      dispatch({ type: FoldersActionKind.CREATE, payload: [data] });
    }
    setIsLoading(false);
  };

  return { isLoading, createFolder };
};

// export const useUpdateFolder = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const { dispatch } = useFoldersContext();
//   const {user} = useAuthContext();
//   const updateFolder = async ({
//     _id,
//     notes,
//   }: Pick<FolderType, "_id" | "notes">) => {
//     setIsLoading(true);
//     const { status, data }: ResponseProps<FolderType> = await axios.patch(
//       `../api/folders/${_id}`,
//       {
//         notes,
//       }, useConfig(user?.token)
//     );
//     if (status === 200 && dispatch) {
//       dispatch({
//         type: FoldersActionKind.UPDATE,
//         payload: [{ ...data, notes }],
//       });
//     }
//     setIsLoading(false);
//   };

//   return { isLoading, updateFolder };
// };

export const useDeleteFolder = () => {
  const { dispatch } = useFoldersContext();
  const { user } = useAuthContext();

  const deleteFolder = async (folderId: FolderType["_id"]) => {
    const { status, data }: ResponseProps<FolderType> = await axios.delete(
      `api/folders/${folderId}`,
      useConfig(user?.token)
    );

    if (status == 202 && dispatch) {
      dispatch({
        type: FoldersActionKind.DELETE,
        payload: [data],
      });
    }
  };

  return deleteFolder;
};
