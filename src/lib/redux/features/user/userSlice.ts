import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type SafeUser, ROLES } from "@/lib/shared";

export const initialState: SafeUser = {
  userId: "",
  login: "",
  roleId: ROLES.GUEST,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action: PayloadAction<SafeUser>) => action.payload,
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
