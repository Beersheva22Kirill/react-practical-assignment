import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userStatus: undefined
}

const slice = createSlice({
    initialState,
    name:"userStatusState",
    reducers: {
        setStatus: (state,data) => {
            state.userStatus = data.payload;
        }
    }
})

export const userStateAction = slice.actions;
export const userStateReducer = slice.reducer;