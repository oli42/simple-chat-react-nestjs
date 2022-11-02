import React from 'react'
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setUserList } from '../feature/userListSlice';

const Chats = () => {

    const [users, setUsers] = useState([]);
    const userList = useAppSelector((state) => state.setUserList);
    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {    
        let url  =  `http://localhost:4000/users/getUsers`;
        const response = fetch(url)
        .then(response => response.json())
        .then(data => setUsers(data));
        console.log('users', users);
        // dispatch({type: "userlist/setUserList", payload: response})
    },[])

    return (
        <div>
            {users.map((User: any) => (
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