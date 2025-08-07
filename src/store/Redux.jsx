import { createSlice, configureStore } from "@reduxjs/toolkit";
import React from "react";

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
const AuthSlice = createSlice({
  name: "Authentication",
  initialState: { isAuthenticate: false },
  reducers: {
    onLogin(state) {
      state.isAuthenticate = true;
    },
    onLogout(state) {
      state.isAuthenticate = false;
    },
  },
});

const themeSlice = createSlice({
  name: "Theme",
  initialState: { darkTheme: false, totalExpense: 0 },
  reducers: {
    ActivateDarkeMode(state) {
      state.darkTheme = true;
    },
    toggleDarkTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
    addTotal(state, action) {
      state.totalExpense =  action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    Authentication: AuthSlice.reducer,
    Theme: themeSlice.reducer,
  },
});

export const counterActions = counterSlice.actions;
export const authActions = AuthSlice.actions;
export const themeActions = themeSlice.actions;

export default store;
