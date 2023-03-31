import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSliceReducer from "../features/auth/authSlice";
import leaderboardSliceReducer from "../features/leaderboard/leaderboardSlice";
import quizSliceReducer from "../features/quiz/quizSlice";
import videosSliceReducer from "../features/videos/videosSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    videos: videosSliceReducer,
    quiz: quizSliceReducer,
    leaderboard: leaderboardSliceReducer,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
