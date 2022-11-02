import { createSlice} from "@reduxjs/toolkit";
import  user  from "./userSlice";

const userListSlice = createSlice({
    name: "userlist",
    initialState: [user],
    reducers: {
        setUserList : (state, action) => {
            state = [...action.payload];
            return state;
        },
        },
    },
);

export const { setUserList } =  userListSlice.actions;
export default userListSlice.reducer;