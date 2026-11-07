import { useState } from "react";
import {useNavigate} from "react-router-dom";
function Login(){
    const navigate=useNavigate()
    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
    const [message,setmessage]=useState("")
   async function handlelogin(event) {
  event.preventDefault();

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/login/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );

    const data = await response.json();
    if(!response.ok){
        setmessage(data.message||"login failed")
        return
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("username",data.username);

    setmessage(data.message);
    navigate("/dashboard");

  } catch (error) {
    setmessage("Unable to connect to the server");
  }
}
    return(
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handlelogin}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}
export default Login