import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import MessageInput from "./MessageInput";


const Chat = () => {

  const send = (messageData: any) => {
    // socket?.emit("messageFromClient", { messageData });
    //  if (Roomlist.some((e : any) => RoomActive.tag == e.tag)){
    //   socket?.emit("newMessageClient", alert )}
    // socket?.emit("newNotifClient", { alertNotif });
}

  return (
    <div className="chat">
      <div className="chatInfo">
        {/* <span>{data.user?.username}</span> */}
        {/* <span>The Chat</span> */}
        <div className="chatIcons">
          {/* <img src={Cam} alt="" />
          <img src={Add} alt="" />
          <img src={More} alt="" /> */}
        </div>
      </div>
      <Messages />
      <MessageInput send={send}/>
    </div>
  );
};

export default Chat;