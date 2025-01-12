import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import assetService from "../services/assetsService";

export const getAssets = createAsyncThunk("assets/getAssets", async () => {
  try {
    const response = await assetService.getAssets();
    return response;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  assets: [],
  loading: false,
};

const assetSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssets.pending, (state) => {
        state.loading = true;
        state.assets = [];
      })
      .addCase(getAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.assets = action.payload.data;
      })
      .addCase(getAssets.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default assetSlice.reducer;
