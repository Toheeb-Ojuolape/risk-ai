import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(sessionStorage.getItem("authUser")),
};

const authSlice = createSlice({
  name: "authOnboarding",
  initialState,
  reducers: {
    resetDetails: () => {
      sessionStorage.removeItem("authUser");
    },
    logoutUser: () => {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("authUser");
      window.location.href = "/login";
    },
  },
});

export const { resetDetails, fetchUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
