import { type RootState } from "@/lib/redux/store";

export const selectUserId = (state: RootState) => state.user.userId;
export const selectLogin = (state: RootState) => state.user.login;
export const selectRoleId = (state: RootState) => state.user.roleId;
