// import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { type User } from "@/lib/db/schema";
// import { ROLES } from "@/lib/shared";

// export const initialUserState: User = {
//   userId: "",
//   login: "",
//   roleId: ROLES.GUEST,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState: initialUserState,
//   reducers: {
//     setUser: (_state, action: PayloadAction<User>) => action.payload,
//     resetUser: () => initialUserState,
//   },
// });

// export const { setUser, resetUser } = userSlice.actions;
// export const userReducer = userSlice.reducer;
