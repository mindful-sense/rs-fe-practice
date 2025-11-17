import { createSlice } from "@reduxjs/toolkit";
import { type User } from "@/lib/db/schema";

const initialState: User[] = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const {} = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
