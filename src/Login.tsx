// function login() {
//   return (
//     <>
//            <h1>hello login</h1>
//     </>
//   )
// }
// export default login

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css"
const API = "https://crud-api-5f45.onrender.com/login";

function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e:React.FormEvent)=>{
    e.preventDefault();

    const res = await fetch(API,{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify({email,password})
    });

    const data = await res.json();

    localStorage.setItem("token",data.token);
    navigate("/dashboard");
  };

  return(
    <form className="auth" onSubmit={submit}>
      <h2>Login</h2>

      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>

      <button>Login</button>

      <Link to="/">SIGN-IN</Link>
    </form>
  );
}

export default Login;
