import React from 'react'
import { useAppSelector } from '../app/hooks';

const Navbar = () => {
    const user = useAppSelector((state) => state.user);
    return (
        <div className="navbar" >
            <span className="logo">The Chat</span>
            <div className='user'>
                <img src={user.avatar}></img>
                <span>{user.username}</span> 
                <button >logout</button>
            </div>
        </div> 
    )
}

export default Navbar;