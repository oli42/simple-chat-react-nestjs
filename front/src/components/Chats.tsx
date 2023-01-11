import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setUserList } from '../feature/userListSlice';
import { addUser, fixRoom } from '../feature/userSlice';
import ChatBox from './ChatBox';
import { SocketContext } from '../context/Socket';


const Chats = () => {
    
    const [alertUser, setAlertUser] = useState("");
    const [users, setUsers] = useState([]);
    const userList = useAppSelector((state) => state.reducer.setUserList);
    const user = useAppSelector((state) => state.reducer.user);
    const dispatch = useAppDispatch();
    const socket = useContext(SocketContext);
    const [messages, setMessages] = useState<any[]>([]);
    let alert = "alert";
    
    const alertListener = (alertUser: string) => {
        setAlertUser(alertUser);
    }
    useEffect(() => {
        socket?.on("newUserServer", alertListener);
        return () => {
            socket?.off("newUserServer", alertListener)
        }
    }, [alertListener])
    
    useEffect(() => {    
        let url  =  `http://localhost:4000/users/getUsers`;
        const response = fetch(url)
        .then(response => response.json())
        .then(data => dispatch({type: setUserList, payload: data}));
    },[alertUser])

    
    async function HandleRoom(username: any) {

        const newUser: any = Object.values(username);
        console.log('newUser', newUser)
        let url_ = "http://localhost:4000/chat/checkOrCreateRoom";
        const res: any = await fetch(url_, {method: "POST",
        headers: {
        // 'Authorization': `Bearer ${values[0]}`,
        'Content-Type': 'application/json',
        'cors': 'true'
        },
        body: JSON.stringify(
            {to:newUser,
            from:user.username})
        })
        const result: any  = await res.json();
        dispatch({type:fixRoom, payload: {tagFrom: result.tagFrom, roomId: result.id}});

        socket?.emit("alertClient", alert + new Date(Date.now()).getSeconds());

    }
    return (
        
         <div>
         {userList.map((User: any) => (
             User.online && User.username !== user.username ?
        //  <div className='userChat'>
             <div className='userChat' key={User.username} onClick={()=> {HandleRoom(User)}}>
                 <img src={User.avatar}/>
                 <span>{User.username}</span>
             {/* </div>  */}
         </div> : null
         ))}
     </div>
    )
}

export default Chats;