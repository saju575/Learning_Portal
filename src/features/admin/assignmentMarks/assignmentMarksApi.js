import { apiSlice } from "../../api/apiSlice";

export const assignmentMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const results = await queryFulfilled;
          if (results?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMarks",
                undefined,
                (draft) => {
                  // eslint-disable-next-line eqeqeq
                  let d = draft.find((q) => q.id == arg.id);
                  Object.assign(d, results.data);
                }
              )
            );
          }
        } catch (e) {
          //do nothing
        }
      },
    }),
  }),
});

export const { useEditAssignmentMarkMutation } = assignmentMarksApi;
