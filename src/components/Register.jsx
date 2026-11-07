import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
function Register(){

    const [username,setusername]=useState("")
    const [password,setpassword]=useState("")
    const [message,setmessage]=useState("")
    const navigate=useNavigate()
    async function handlesubmit(event){
        event.preventDefault()
        try{
            const response=await fetch("http://127.0.0.1:8000/api/register/",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({username:username,password:password})
            })
            // const data=response.json()
            const data=await response.json()
            console.log("Django response:", data);
            if(!response.ok){
                const errorMessage =Array.isArray(data.message) ? data.message.join(", ") : data.message || "Registration failed";

                setmessage(errorMessage);
                return;
            }
            setmessage(data.message || "registration created successfully")
            navigate("/login")
        }
        catch(error){
            setmessage("un able to connect server")
            console.error(error)
        }
    }
    return(
        <div className="login-container">
            <h2>create account</h2>
            <form action="" onSubmit={handlesubmit}>
                <div className="form-group">
                    <label htmlFor="">Username:</label>
                    <input type="text" value={username} onChange={(event)=>setusername(event.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="">Password:</label>
                    <input type="password" value={password} onChange={(event)=>setpassword(event.target.value)} required
                    ></input>

                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
            <p>already have an account? <Link to="/login">Login</Link></p>

        </div>
    )
}
export default Register