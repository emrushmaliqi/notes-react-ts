import axios from "axios";
import { FolderType, ResponseProps } from "../Types";
import { FoldersContext, FoldersActionKind } from "../context/FoldersContext";
import { useContext, Dispatch, useState } from "react";

export const useFoldersContext = () => {
  const context = useContext(FoldersContext);

  if (!context.dispatch)
    throw Error("useFoldersContext must be used inside its Provider");

  return context;
};

export const useSetFolders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useFoldersContext();

  const setFolders = async () => {
    setIsLoading(true);
    const { status, data }: ResponseProps<FolderType[]> = await axios.get(
      `${location.pathname !== "/" ? "../" : ""}api/folders/`
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
  const [isLoading, setIsLoading] = useState(false);

  const createFolder = async (folder: FolderType) => {
    setIsLoading(true);
    const { status, data }: ResponseProps<FolderType> = await axios.post(
      "api/folders",
      folder
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
//   const updateFolder = async ({
//     _id,
//     notes,
//   }: Pick<FolderType, "_id" | "notes">) => {
//     setIsLoading(true);
//     const { status, data }: ResponseProps<FolderType> = await axios.patch(
//       `../api/folders/${_id}`,
//       {
//         notes,
//       }
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

  const deleteFolder = async (folderId: FolderType["_id"]) => {
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

  return deleteFolder;
};
