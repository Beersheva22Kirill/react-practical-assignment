import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    cashPost: []
}

const slice = createSlice({
    initialState,
    name:"cashPosts",
    reducers: {
        setCashPost: (state,data) => {
            state.cashPost = data.payload;
        }
    }
})

export const cashPostAction = slice.actions;
export const cashPostReducer = slice.reducer;