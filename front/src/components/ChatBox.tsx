import React, { useContext, useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { useAppSelector } from "../app/hooks";
import { io, Socket } from "socket.io-client";
import con from '../img/con.png';
import { SocketContext } from '../context/Socket';


const ChatBox = () => {

  const user = useAppSelector((state) => state.reducer.user);
  const [messages, setMessages] = useState<any[]>([]);
  const [value, setValue] = useState<string>("");
  

  // const alert = "NEW MESSAGE AVAILABLE";
  const  alertNotif = {
      text: "New message",
      // from: String(User.nickname),
      // room: String(RoomActive.tag)
  }

  const socket = useContext(SocketContext);


  useEffect(() => {
      let url : string = `http://localhost:4000/chat/getRoomMessages/${String(user.roomId)}`;
      const ret = fetch(url)
      .then(response => response.json())
      .then(data => setMessages(data))
  }, [messages.length])

  const send = (messageData: any) => {
      socket?.emit("messageFromClient", { messageData });
  }

  const messageListener = (message: any) => {
      console.log(message);
      let MessagesList : any[] = [];
      if (messages.length > 0)
          MessagesList = [...messages];
      MessagesList.push(message.messageData);
      console.log('messageList', MessagesList);
      setMessages(MessagesList);
  }
  
  useEffect(() => {
      socket?.on("messageFromServer" , messageListener)
      return () => {
          socket?.off("messageFromServer", messageListener)
      }
  }, [messageListener])


  return (
    <div className="chat">
      <div className="chatInfo">
      {/* <div className={`chatInfo ${user.roomId != "0" && "truc"}`}> */}
        {<span>{user.tagFrom} <span style={{color: "red"}} >----</span></span>}
      </div>
        <div className='messages '>
          {
              messages.length > 0 ?
              messages.slice(-20).map((message: any, index: number) => (  
                  message.roomTag == user.roomId ?
                  <div className={`message ${message.fromUsername === user.username && "owner"}`}>
                      <div key={message.index} className='messageInfo'>
                          <span >{message.fromUsername} |{message.time}</span>
                          <div className='messageContent'>
                              <p>{message.text}</p>
                          </div>
                      </div>
                  </div> 
                  : null
              ))
          : null           
          }
          <div>
        </div>
      </div>
        <MessageInput send={send}/>
    </div>
  );
};

export default ChatBox;