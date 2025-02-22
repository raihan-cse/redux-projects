import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { editVideo, getVideo } from "./videoAPI";

const initialState = {
  video: {},
  isLoading: false,
  isError: false,
  error: "",
};

//Async Thunk
export const fetchVideo = createAsyncThunk("video/fetchVideo", async (id) => {
  const video = await getVideo(id);
  return video;
});

export const updateVideo = createAsyncThunk(
  "video/updateVideo",
  async ({ id, data }) => {
    const video = await editVideo(id, data);
    return video;
  }
);

//Slice
const videoSlice = createSlice({
  name: "video",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.video = action.payload;
      })
      .addCase(fetchVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.video = [];
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(updateVideo.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(updateVideo.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.video = action.payload;
      })
      .addCase(updateVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export const { likeIncrement, likeDecrement } = videoSlice.actions;

export default videoSlice.reducer;
