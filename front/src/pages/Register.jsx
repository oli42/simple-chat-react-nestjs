import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";




const Register = () => {
    const [err, setErr] = useState(false);
    // const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
   
    


  async function handleSubmit(e) {
        // setLoading(true);
        e.preventDefault();
        let url = "http://localhost:4000/users/createUser";
        const response = await fetch(url, {method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'cors': 'true'
        },
        body: JSON.stringify({
          username: e.target[0].value,
          email: e.target[1].value,
          password: e.target[2].value,
        })
      }
    )
    const result = await response.json();

    console.log('reponse createUser' , result);
    if (response.err){
      setErr(true);
    }
    
    
    console.log('selectedFile', selectedFile);
    
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);
    let res = await fetch(
			`http://localhost:4000/users/${result.id}/upload`,
			{
				method: "POST",
				headers: {},
				body: formData,
			}
		).then(res => res.json())
    console.log('res', res);
    
 
    }
    return (
      <div className="formContainer">
        <div className="imgContainer">
            <div className="formWrapper">
            <span className="logo">The Chat</span>
            <span className="title">Register</span>
            <form onSubmit={handleSubmit}>
                <input required type="text" placeholder="name" />
                <input required type="email" placeholder="email" />
                <input required type="password" placeholder="password" />
                <input required style={{ display: "none" }} type="file" id="file" onChange={(e) => setSelectedFile(e.target.files[0])}/>
                <label htmlFor="file">
                <img src={Add} alt="" />
                <span>Add an avatar</span>
                </label>
                <button>Sign up</button>
                {/* {err && <span>File size cannot exceed more than 1MB</span>} */}
                {err}
            </form>
            <p>
                Already registered ? <Link to="/Login">Login</Link>
            </p>
            </div>
        </div>
      </div>
    );
  };
  
  export default Register;