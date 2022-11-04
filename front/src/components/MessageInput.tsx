import React, { useState } from 'react'
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { useSelector } from 'react-redux';
import { useAppSelector } from '../app/hooks';

const MessageInput = ({send}: {send: (messagedata: any) => void}) => {

  const [value, setValue] = useState("");
  // const user = useAppSelector((state) => state.reducer.user);
  // const RoomActive = useSelector((state: any) => state.RoomActive);

  
  // const messagedata = {
  //   fromUsername: String(user.username),
  //     time:
  //       new Date(Date.now()).getHours() +
  //       ":" +
  //       new Date(Date.now()).getMinutes(),
  //     text: value,
  //     room: String(RoomActive.tag),
  //   };

  
  // const handleClick = (value: string) => { 

  //     messagedata.text = value;
  //     send(messagedata);
  //     setValue("");
  // }
  
  return (
                  
      <div className='messagesInput'>
          <input type="text" onChange={(e)=>{setValue(e.target.value)}} placeholder="Type something..."value={value} />
              <div className="send">
                <img src={Attach} alt="" />
                <input type="file" style={{ display: "none" }} id="file"
                  //   onChange={(e) => setImg(e.target.files[0])}
                  />
              <label htmlFor="file">
            <img src={Img} alt="" />
          </label>
        {/* <button onClick={() => handleClick(value)}> Send</button> */}
        <button > Send</button>
      </div>
    </div>
  );
  }
export default MessageInput;