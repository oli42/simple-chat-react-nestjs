import React from 'react'
import { useState, useEffect } from 'react';

const Chats = () => {

    const [users, setUsers] = useState([]);

    useEffect( () => {    
        let url  =  `http://localhost:4000/users/getUsers`;
        const response = fetch(url)
        .then(response => response.json())
        .then(data => setUsers(data));
        console.log('users', users);
    }, []
    )
    return (
        <div>
            {users.map((user, index) => (
                user.online ?
            <div className='userChat'>
                <div className="userChat" key={index} >
                    
                        <img src={user.avatar}/>
                        <span>{user.username}</span> 
                   
                </div> 
            </div> : null
            ))}
        </div>
    )
}

export default Chats;