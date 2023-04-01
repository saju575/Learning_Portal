import { apiSlice } from "../../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                draft.push(result.data);
              })
            );
          }
        } catch (e) {
          //do nothing
        }
      },
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const result = await queryFulfilled;
          if (result?.data) {
            dispatch(
              apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
                // eslint-disable-next-line eqeqeq
                let d = draft.find((v) => v.id == arg.id);
                Object.assign(d, result.data);
              })
            );
            dispatch(
              apiSlice.util.updateQueryData(
                "getVideo",
                arg.id.toString(),
                (draft) => {
                  draft = result.data;
                }
              )
            );
          }
        } catch (e) {
          //do nothing
        }
      },
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(
            apiSlice.util.updateQueryData("getVideos", undefined, (draft) => {
              // eslint-disable-next-line eqeqeq
              const indx = draft.findIndex((v) => v.id == arg);
              draft.splice(indx, 1);
            })
          );
        } catch (e) {
          //do nothing
        }
      },
    }),
  }),
});

export const {
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = videosApi;
