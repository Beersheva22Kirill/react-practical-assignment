import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { userStateReducer } from "./slices/AuthorizedSlice";
import { cashPostReducer } from "./slices/PostCashSlice";

export const store = configureStore({
    reducer: {
        userState:userStateReducer,
        cashPostsState:cashPostReducer
    }
})

export function useSelectorUserState() {
    return useSelector(state => state.userState.userStatus)
}

export function useSelectorCashPosts() {
    return useSelector(state => state.cashPostsState.cashPost)
}