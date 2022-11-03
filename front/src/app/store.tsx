// @ts-ignore
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../feature/userSlice"
import userListReducer from "../feature/userListSlice"
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({ 
    user: userReducer,
    setUserList: userListReducer,
})

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: {
        // user: persistedReducer,
        // setUserList: userListReducer,
        reducer: persistedReducer
    },
})
export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;