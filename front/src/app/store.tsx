// @ts-ignore
import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../feature/userSlice"
import userListReducer from "../feature/userListSlice"



export const store = configureStore({
    reducer: {
        user: userReducer,
        setUserList: userListReducer,
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;