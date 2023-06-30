import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    renderStatus: false
}

const slice = createSlice({
    initialState,
    name:"renderStatusState",
    reducers: {
        setStatusRender: (state,data) => {
            state.renderStatus = data.payload;
        }
    }
})

export const renderStatusAction = slice.actions;
export const renderStatusReducer = slice.reducer;