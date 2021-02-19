import { CognitoUserExt } from "../components/auth/authTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: [
    {
      currentNoteID: "",
      data: [],
    },
  ],
  reducers: {
    setUser: (_, action: PayloadAction<CognitoUserExt | null>) =>
      action.payload,
  },
});

export const { setUser } = notesSlice.actions;

export const selectUser = (state) => state?.user?.value;
