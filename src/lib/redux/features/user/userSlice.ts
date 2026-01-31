import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ROLES } from "@/lib/constants";
import { type SessionUser } from "@/lib/db/schemas";

export const initialState: SessionUser = {
  userId: "",
  login: "",
  roleId: ROLES.GUEST,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<SessionUser>) => action.payload,
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
