import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ROLES } from "@/config";
import { type PublicUser } from "@/lib/db/schema";

export const initialUserState: PublicUser = {
  userId: "",
  login: "",
  roleId: ROLES.GUEST,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (_state, action: PayloadAction<PublicUser>) => action.payload,
    resetUser: () => initialUserState,
  },
});

export const { setUser, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
