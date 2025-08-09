import { createSlice, configureStore } from "@reduxjs/toolkit";
import React from "react";
import cartSlice from "./CartRedux";

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
      state.totalExpense = action.payload;
    },
  },
});

const cartsSlice = createSlice({
  name: "carts",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    replaceCart(state, action) {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
    },
    
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    Authentication: AuthSlice.reducer,
    Theme: themeSlice.reducer,
    cart: cartSlice.reducer,
    carts: cartsSlice.reducer,
  },
});

export const counterActions = counterSlice.actions;
export const authActions = AuthSlice.actions;
export const themeActions = themeSlice.actions;

export const cartActions = cartSlice.actions;
export const cartsActions = cartsSlice.actions;

export default store;
