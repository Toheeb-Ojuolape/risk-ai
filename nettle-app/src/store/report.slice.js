import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import reportService from "../services/reportService";

export const getReports = createAsyncThunk("reports/getReports", async () => {
  try {
    const response = await reportService.getReports()
    return response;
  } catch (error) {
    console.log(error);
  }
});


export const generateReport = createAsyncThunk("reports/generateReport", async () => {
    try {
      const response = await reportService.generateReport()
      return response;
    } catch (error) {
      console.log(error);
    }
  });

export const getReport = createAsyncThunk("reports/getReport", async (id) => {
    try {
      const response = await reportService.getReport(id)
      return response;
    } catch (error) {
      console.log(error);
    }
  });


const initialState = {
  data: null,
  reports: [],
  loading: false,
};

const assetSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReport.pending, (state) => {
        state.loading = true;
        state.report = null;
      })
      .addCase(getReport.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.data = action.payload.data;
      })
      .addCase(getReport.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getReports.pending, (state) => {
        state.loading = true;
        state.reports = [];
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.data;
      })
      .addCase(getReports.rejected, (state) => {
        state.loading = false;
      })

      .addCase(generateReport.pending, (state) => {
        state.loading = true;
        state.report = null;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload.data;
      })
      .addCase(generateReport.rejected, (state) => {
        state.loading = false;
      })

  },
});

export default assetSlice.reducer;
