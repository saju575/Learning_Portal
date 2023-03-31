import { apiSlice } from "../api/apiSlice";
import { adminLogin } from "./adminAuthSlice";

export const adminAuthApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result.data.user.role === "admin") {
            localStorage.setItem(
              "adminAuth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                admin: result.data.user,
              })
            );
            dispatch(
              adminLogin({
                accessToken: result.data.accessToken,
                admin: result.data.user,
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

export const { useAdminLoginMutation } = adminAuthApi;
