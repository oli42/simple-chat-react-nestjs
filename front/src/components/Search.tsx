import React, { useState } from "react";
const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    return (
        <div className="search">
            <div className="searchForm">
                <input
                type="text"
                placeholder="Find a user"
                // onKeyDown={handleKey}
                //   onChange={(e) => setUsername(e.target.value)}
                //   value={username}
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