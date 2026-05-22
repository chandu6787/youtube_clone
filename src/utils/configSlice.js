import { createSlice } from "@reduxjs/toolkit";
const configSlice=createSlice({
    name:"config",
    initialState:{
        isMenuOpen:true
    },
    reducers:{
        toggleMenu:(state)=>{
            state.isMenuOpen=!state.isMenuOpen;
        },
         closeMenu:(state)=>{
            state.isMenuOpen=false;
        },
    },

});
export const {toggleMenu,closeMenu}=configSlice.actions;
export default configSlice.reducer;