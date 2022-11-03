import React from 'react'
import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setUserList } from '../feature/userListSlice';

const Chats = () => {

    const [alertUser, setAlertUser] = useState("");
    const [users, setUsers] = useState([]);
    const userList = useAppSelector((state) => state.reducer.setUserList);
    const user = useAppSelector((state) => state.reducer.user);
    const dispatch = useAppDispatch();
    const [socket, setSocket] = useState<Socket>()


    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket)
    }, [setSocket])

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
        // .then(data => setUsers(data));
    },[alertUser])

    return (
        // <div>
        //     {users.map((User: any) => (
        //         User.online && User.username != user.username ?
        //     <div className='userChat'>
        //         <div className="userChat" key={User.id} >
        //             <img src={User.avatar}/>
        //             <span>{User.username}</span> 
        //         </div> 
        //     </div> : null
        //     ))}
        // </div>
         <div>
         {userList.map((User: any) => (
             User.online && User.username != user.username ?
         <div className='userChat'>
             <div className="userChat" key={User.id} >
                 <img src={User.avatar}/>
                 <span>{User.username}</span> 
             </div> 
         </div> : null
         ))}
     </div>
    )
}

export default Chats;