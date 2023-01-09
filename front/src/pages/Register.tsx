import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addUser } from "../feature/userSlice";
import { setUserList } from "../feature/userListSlice";




const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File>(Add);

  const user = useAppSelector((state) => state.reducer.user);
  const dispatch = useAppDispatch();

  const handleSelect = async (e: any) => setSelectedFile(e.target.files[0])
    
  async function handleSubmit(e: any) {
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
      if (!result){
        setError(true);
        navigate("/");
        return ;
      }
    console.log('reponse createUser' , result);
    dispatch({type: addUser,payload: result});
    
    
    
    
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
      navigate("/Home");
      dispatch({type: addUser,payload: res});

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
                <input required style={{ display: "none" }} type="file" id="file" onChange={handleSelect}/>
                <label htmlFor="file">
                <img src={Add} alt="" />
                <span>Add an avatar</span>
                </label>
                <button>Sign up</button>
                {/* {err && <span>File size cannot exceed more than 1MB</span>} */}
                {error && <span>Email Already used</span> }
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