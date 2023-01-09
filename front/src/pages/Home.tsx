import React from 'react'
import Register from './Register'
import Login from "./Login";
import Sidebar from '../components/Sidebar'
import ChatBox from '../components/ChatBox';

const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <ChatBox/>
        <Sidebar/>
      </div>
    </div>
  )
}

export default Home