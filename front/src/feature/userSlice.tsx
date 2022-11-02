import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: string,
    username: string,
    email: string,
    avatar: string,
    online: boolean,
}

const initialState: UserState = {
    id: "",
    username: "",
    email: "",
    avatar: "",
    online: false,
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
        }
    }
})

export const { addUser } =  userSlice.actions;
export default userSlice.reducer;