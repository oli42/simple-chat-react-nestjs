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
        // .then(data => dispatch({type: setUserList, payload: data}));
        .then(data => setUsers(data));
    },[alertUser])



    async function handleRoom(User: any) {
            
        let url_ = "http://localhost:4000/chat/checkIfRoom";
            const response = await fetch(url_, {method: "POST",
            headers: {
            // 'Authorization': `Bearer ${values[0]}`,
            'Content-Type': 'application/json',
            'cors': 'true'
            },
            body: JSON.stringify({
            id1: User.username,
            id2: user.username,
            })
        })
        let result  = await response.json();

   

        let url_a = "http://localhost:4000/chat/leaveRoom";
        await fetch(url_a, {
            method: "POST",
            headers: {
                // 'Authorization': `Bearer ${values[0]}`,
                'Content-Type': 'application/json',
                'cors': 'true'
            },
            body: JSON.stringify({
                // tag : RoomActive.tag,
                username: user.username,
            })
        })

       

        let url_b = "http://localhost:4000/chat/joinRoom";
            const res =  await fetch(url_b, {method: "POST",
            headers: {
                // 'Authorization': `Bearer ${values[0]}`,
                'Content-Type': 'application/json',
                'cors': 'true'
            },
            body: JSON.stringify({
                id1: User.id,
                id2: user.id,
            })
        }
        ).then(rep => rep.json())
        // dispatch({type: "User/addRoom",payload: response.tag})
        // dispatch({type: "RoomActive/setRoomActive",payload: response}); 
        
    }
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
             <div className="userChat" key={User.id} onClick={()=> handleRoom(User)}>
                 <img src={User.avatar}/>
                 <span>{User.username}</span> 
             </div> 
         </div> : null
         ))}
     </div>
    )
}

export default Chats;