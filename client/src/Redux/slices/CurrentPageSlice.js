import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1
}

const slice = createSlice({
    initialState,
    name:"currentPageState",
    reducers: {
        setCurrentPage: (state,data) => {
            state.currentPage = data.payload;
        }
    }
})

export const currentPageAction = slice.actions;
export const currentPageReducer = slice.reducer;