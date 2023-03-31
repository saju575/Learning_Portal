import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  admin: undefined,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.admin = action.payload.admin;
    },
    adminLogedOut: (state) => {
      state.accessToken = undefined;
      state.admin = undefined;
    },
  },
});
export default adminAuthSlice.reducer;
export const { adminLogedOut, adminLogin } = adminAuthSlice.actions;
