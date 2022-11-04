import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '../app/hooks';
import Chat from './Chat';
import MessageInput from './MessageInput';

const Messages = () => {
    const [socket, setSocket] = useState<Socket>();
    const [messages, setMessages] = useState<any[]>([]);
    const [value, setValue] = useState<string>("");
    // const RoomActive = useSelector((state: any) => state.RoomActive);
    const user = useAppSelector((state) => state.reducer.user);
    // const Roomlist = useSelector((state: any) => state.RoomList);
    

    const alert = "NEW MESSAGE AVAILABLE";
    const  alertNotif = {
        text: "New message",
        // from: String(User.nickname),
        // room: String(RoomActive.tag)
    }

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        console.log('New socket', newSocket?.id);
        setSocket(newSocket)
    }, [setSocket])
    
    // Récupération des messages de la room active.
    // useEffect(() => {
    //     let url : string = `http://localhost:4000/chat/getRoomMessages/${RoomActive.tag}`;
    //     const ret = fetch(url)
    //     .then(response => response.json())
    //     .then(data => setMessages(data))
    // }, [RoomActive])

    const send = (messageData: any) => {
        socket?.emit("messageFromClient", { messageData });
        //  if (Roomlist.some((e : any) => RoomActive.tag == e.tag)){
        //   socket?.emit("newMessageClient", alert )}
        socket?.emit("newNotifClient", { alertNotif });
    }

    const messageListener = (message: any) => {
        console.log(message);
        let MessagesList : any[] = [];
        if (messages.length > 0)
            MessagesList = [...messages];
        MessagesList.push(message.messageData);
        console.log(MessagesList);
        setMessages(MessagesList);
    }
    
    useEffect(() => {
        socket?.on("messageFromServer" , messageListener)
        return () => {
            socket?.off("messageFromServer", messageListener)
        }
    }, [messageListener])
    return (
        <div className='messages'>
            {/* <Chat/> */}
            {/* <Conversation messages={messages} /> */}
            {/* <MessageInput send={send}/> */}
        </div>
            
    )
}

export default Messages;