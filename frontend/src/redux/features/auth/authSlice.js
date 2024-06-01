import { createSlice } from "@reduxjs/toolkit";

const name = localStorage.getItem("name");
const role = localStorage.getItem("role");

const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  role: role ? role : "",
  user: {
    name: "",
    email: "",
    phone: "",
    bio: "",
    photo: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload;
    },
    SET_NAME(state, action) {
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("_id", action.payload._id);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("photo", action.payload.photo);
      localStorage.setItem("bio", action.payload.bio);

      state.name = action.payload.name;
      state.role = action.payload.role;
    },
    SET_USER(state, action) {
      const profile = action.payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.role = profile.role;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
});

export const { SET_LOGIN, SET_NAME, SET_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectName = (state) => state.auth.name;
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role;
export const selectUserData = (state) => state.auth;
export default authSlice.reducer;
