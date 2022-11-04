import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Navbar = () => {
    
    const [socket, setSocket] = useState<Socket>()
    const user = useAppSelector((state) => state.reducer.user);
    let navigation = useNavigate();
    const dispatch = useAppDispatch();
    const alertUser = "User left";

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket)
    }, [setSocket])


    const  handleLogout = async (e: any) => {
        e.preventDefault();
        let url = "http://localhost:4000/users/logout";
        const response = await fetch(url, {method: "POST",
        headers: {
        'Content-Type': 'application/json',
        'cors': 'true'
        },
        body: JSON.stringify({
            email: user.email
        })
    })
    const result = await response.json();
    console.log('response logout', response)
    dispatch({type: "user/logout"})
    socket?.emit("newUserClient", alertUser);

    navigation("/Login");
    }
    return (
        <div className="navbar" >
            <div className='user'>
            <p >{user.username}</p>
                <img src={user.avatar}></img>
                {/* <span></span>  */}
                <button onClick={(e) => handleLogout(e)}>logout</button>
            </div>
        </div> 
    )
}

export default Navbar;