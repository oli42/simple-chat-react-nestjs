import React from 'react'
import Register from './Register'
import Login from "./Login";
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import Chats from '../components/Chats'

const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home