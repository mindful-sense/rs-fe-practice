import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ROLE } from "@/config";
import { type PublicUser } from "@/lib/db/schema";

const initialState: PublicUser = {
  userId: "",
  login: "",
  registeredAt: "",
  roleId: ROLE.GUEST,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export const userReducer = userSlice.reducer;
