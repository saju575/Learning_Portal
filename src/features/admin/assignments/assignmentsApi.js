import { apiSlice } from "../../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  draft.push(result.data);
                }
              )
            );
          }
        } catch (e) {
          //do nothing
        }
      },
    }),
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignments",
                undefined,
                (draft) => {
                  // eslint-disable-next-line eqeqeq
                  let d = draft.find((v) => v.id == arg.id);
                  Object.assign(d, result.data);
                }
              )
            );
          }
        } catch (e) {
          //do nothing
        }
      },
    }),
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAssignments",
              undefined,
              (draft) => {
                // eslint-disable-next-line eqeqeq
                const indx = draft.findIndex((v) => v.id == arg);
                draft.splice(indx, 1);
              }
            )
          );
        } catch (e) {
          //do nothing
        }
      },
    }),
  }),
});

export const {
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
  useEditAssignmentMutation,
} = videosApi;
