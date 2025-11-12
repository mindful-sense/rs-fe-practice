import { createSlice } from "@reduxjs/toolkit";
import { ROLES } from "@/config";
import { type PublicUser } from "@/lib/db/schema";

const initialState: PublicUser = {
  userId: "",
  login: "",
  roleId: ROLES.GUEST,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
