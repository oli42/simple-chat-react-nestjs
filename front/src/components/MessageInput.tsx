import React, { useState } from 'react'
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { useAppSelector } from '../app/hooks';

const MessageInput = ({send}: {send: (messagedata: any) => void}) => {

  const [value, setValue] = useState("");
  const user = useAppSelector((state) => state.reducer.user);

  
  const messagedata = {
    fromUsername: user.username,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
      text: value,
      room: user.roomId,
    };

  
  const handleClick = (value: string) => { 

      messagedata.text = value;
      console.log('messageData', messagedata)
      send(messagedata);
      setValue("");
  }
  
  return (
                  
      <div className='messagesInput'>
          <input type="text" onChange={(e)=>{setValue(e.target.value)}} placeholder="Time to chat..."value={value} />
              <div className="send">
                {/* <input type="file" style={{ display: "none" }} id="file"/> */}
        <button onClick={() => handleClick(value)}> Send</button>
      </div>
    </div>
  );
  }
export default MessageInput;