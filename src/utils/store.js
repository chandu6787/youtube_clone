import { configureStore } from "@reduxjs/toolkit";
import configSlice from "./configSlice"
import searchSlice from "./searchSlice"
import chatSlice from "./chatSlice"
const store=configureStore({
  reducer:{
    config:configSlice,
    search:searchSlice,
    chat:chatSlice

  }
})
export default store;