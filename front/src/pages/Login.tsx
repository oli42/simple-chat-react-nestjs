import React, { useEffect, useState } from "react";
import { useNavigate, Link, useAsyncError } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addUser } from "../feature/userSlice";

const Login = () => {

  const [socket, setSocket] = useState<Socket>()
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const alertUser = "New user";

  useEffect(() => {
      const newSocket = io('http://localhost:8000');
      setSocket(newSocket)
  }, [setSocket])


  const handleSubmit = async (e: any) => {
      e.preventDefault();
      let url = "http://localhost:4000/users/login";
      const response = await fetch(url, {method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'cors': 'true'
    },
      body: JSON.stringify({
        email: e.target[0].value,
        password: e.target[1].value,
      })
  })
  const result = await response.json();
  dispatch({type: addUser,payload: result});

  console.log('reponse login' , result);
  if (err){
    setErr(true);
  }
  socket?.emit("newUserClient", alertUser);
  navigate("/Home");
}
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">The Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {/* {err && <span>Something went wrong</span>} */}
        </form>
        <p>You don't have an account? <Link to="/">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;