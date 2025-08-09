import React from 'react'
import { configureStore, createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name:"cart",
    initialState:{toggle:false},
    reducers:{
        toggleCart(state){
            state.toggle = !state.toggle
        }
    }
})



export default cartSlice;




