import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth.slice";
import assetSlice from "./asset.slice"
import reportSlice from "./report.slice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    asset: assetSlice,
    report: reportSlice
  },
});
