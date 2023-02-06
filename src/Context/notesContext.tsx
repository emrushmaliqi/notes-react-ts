import { createContext } from "react";
import { DataType } from "../Types";
import data from "../data.json";

export const notesContext = createContext<DataType>(data);
