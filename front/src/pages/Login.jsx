import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
import { Link } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  // const navigate = useNavigate();

    const handleSubmit = async (e) => {
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

  console.log('reponse login' , result);
  if (response.err){
    setErr(true);
  }
  
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
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;