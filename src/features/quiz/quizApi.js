import { apiSlice } from "../api/apiSlice";
import { addQuestions } from "./quizSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuiz: builder.query({
      query: (id) => `/quizzes?video_id=${id}`,
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const results = await queryFulfilled;
          //console.log(results?.data);
          if (results?.data) {
            //console.log(results?.data);
            // let questions = results.data;
            // questions.forEach((question) => {
            //   question.options.forEach((option) => {
            //     option.checked = false;
            //   });
            // });
            // console.log(questions);
            dispatch(addQuestions(results.data));
          }
        } catch (e) {
          //do nothing
        }
      },
    }),
    getQuizMarks: builder.query({
      query: () => `/quizMark`,
    }),
    setQuizMarks: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { queryFulfilled, dispatch }) => {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getQuizMarks",
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
  useGetQuizQuery,
  useSetQuizMarksMutation,
  useGetQuizMarksQuery,
} = quizApi;
