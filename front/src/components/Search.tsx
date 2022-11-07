import React, { useState } from "react";


const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);


    const handleSelect = async (e: any) => {
    //     e.preventDefault();
    //     let url = "http://localhost:4000/users/login";
    //     const response = await fetch(url, {method: "POST",
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'cors': 'true'
    //   },
    //     body: JSON.stringify({
    //       email: e.target.value,
    //     })
    // })
    // const result = await response.json();
    }
    
    return (
        <div className="search">
            <div className="searchForm">
                <input
                type="text"
                placeholder="User not online? Send anyway!"
                />
            </div>
            {err && <span>User not found!</span>}
            {user && (
                <div className="userChat" >
                {/* <div className="userChat" onClick={handleSelect}> */}
                {/* <img src={user.avatar} alt="" /> */}
                <div className="userChatInfo">
                    {/* <span>{user.username}</span> */}
                </div>
                </div>
            )}
        </div>
    )
}

export default Search;