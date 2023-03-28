import { apiSlice } from "../api/apiSlice";
import { userLogedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
          dispatch(
            userLogedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (e) {
          //do nothing
        }
      },
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const result = await queryFulfilled;
          if (result.data.user.role === "student") {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
            dispatch(
              userLogedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
          }
        } catch (e) {
          //do nothing
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
