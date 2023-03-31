import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => `/assignmentMark`,
    }),
    getAssignments: builder.query({
      query: () => `/assignments`,
    }),
    submitAssignment: builder.mutation({
      query: (data) => ({
        url: `/assignmentMark`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAssignmentMarks",
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
  }),
});

export const {
  useGetAssignmentMarksQuery,
  useGetAssignmentsQuery,
  useSubmitAssignmentMutation,
} = assignmentApi;
