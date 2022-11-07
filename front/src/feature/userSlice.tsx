import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: string,
    username: string,
    email: string,
    avatar: string,
    online: boolean,
    tagFrom: string,
    roomId: number
}

const initialState: UserState = {
    id: "",
    username: "",
    email: "",
    avatar: "",
    online: false,
    tagFrom: "",
    roomId: 0,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser : (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.avatar = action.payload.avatar;
            state.online = action.payload.online;
            state.tagFrom = "";
            state.roomId = 0;

        },
        fixRoom : (state, action: PayloadAction<UserState>) =>{
            // state.id = state.id ;
            // state.username = state.username;
            // state.email = state.email;
            // state.avatar = state.avatar;
            // state.online = state.online ;
            state.tagFrom = action.payload.tagFrom;
            state.roomId = action.payload.roomId;
        },
        logout : (state, action) => {
            state = initialState;
            return state;
        }
    }
})

export const { addUser, fixRoom } =  userSlice.actions;
export default userSlice.reducer;