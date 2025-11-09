import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type PublicUser } from "@/lib/db/schema";

const initialState: PublicUser[] = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const usersReducer = usersSlice.reducer;
