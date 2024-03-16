import { createSlice } from "@reduxjs/toolkit";

const name = JSON.parse(localStorage.getItem("name"));
const role = JSON.parse(localStorage.getItem("role"));

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
      console.log(action.payload);

      localStorage.setItem("name", JSON.stringify(action.payload.name));
      localStorage.setItem("role", JSON.stringify(action.payload.role));
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
export default authSlice.reducer;
