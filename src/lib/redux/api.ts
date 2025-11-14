import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type PublicUser } from "@/lib/db/schema";
import { setUser, resetUser } from "./features";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  tagTypes: ["Me"],
  endpoints: (builder) => ({
    getMe: builder.query<PublicUser | null, void>({
      query: () => "api/me",
      providesTags: ["Me"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setUser(data));
          }
        } catch {
          dispatch(resetUser());
        }
      },
    }),
  }),
});

export const { useGetMeQuery } = api;
