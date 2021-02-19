import React from "react";
import { Note } from "../../models";
import { CognitoUserExt } from "./authTypes";

const AuthContext = React.createContext<{
  user: CognitoUserExt | null;
  currentNoteID: string | null;
  setCurrentNoteID: React.Dispatch<React.SetStateAction<string>>;
  notes: Note[];
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}>({
  user: null,
  currentNoteID: null,
  setCurrentNoteID: null,
  notes: [],
  setNotes: null,
});
export default AuthContext;
