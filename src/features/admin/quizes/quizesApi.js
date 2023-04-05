import { apiSlice } from "../../api/apiSlice";

export const quizesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQuizes: builder.query({
      query: () => `/quizzes`,
    }),
    addQuiz: builder.mutation({
      query: (data) => ({
        url: `/quizzes`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const results = await queryFulfilled;
          if (results?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllQuizes",
                undefined,
                (draft) => {
                  draft.push(results.data);
                }
              )
            );
          }
        } catch (e) {
          //do nothing
        }
      },
    }),
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const results = await queryFulfilled;
          if (results?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllQuizes",
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
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData(
              "getAllQuizes",
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
  useGetAllQuizesQuery,
  useAddQuizMutation,
  useEditQuizMutation,
  useDeleteQuizMutation,
} = quizesApi;
