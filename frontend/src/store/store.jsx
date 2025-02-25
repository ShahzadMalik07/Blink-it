import { configureStore } from "@reduxjs/toolkit"
import user from "./userSlice"
import product from "./productSlice"
export const store = configureStore({
    reducer:{
        user: user,
        product:product
    }
})