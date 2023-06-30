import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { userStateReducer } from "./slices/AuthorizedSlice";
import { cashPostReducer } from "./slices/PostCashSlice";
import { renderStatusReducer } from "./slices/RenderStatusSlice";
import { currentPageReducer } from "./slices/CurrentPageSlice";

export const store = configureStore({
    reducer: {
        userState:userStateReducer,
        cashPostsState:cashPostReducer,
        renderState:renderStatusReducer,
        currentPageState:currentPageReducer
    }
})

export function useSelectorUserState() {
    return useSelector(state => state.userState.userStatus)
}

export function useSelectorCashPosts() {
    return useSelector(state => state.cashPostsState.cashPost)
}

export function useSelectorRenderStatus() {
    return useSelector(state => state.renderState.renderStatus)
}

export function useSelectorCurrentPageStatus() {
    return useSelector(state => state.currentPageState.currentPage)
}