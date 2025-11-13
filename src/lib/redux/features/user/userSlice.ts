import { createSlice } from "@reduxjs/toolkit";
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
    resetUser: () => initialUserState,
  },
});

export const { resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
