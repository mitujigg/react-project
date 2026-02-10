
// function sign() {
//   return (
//     <>
//            <h1>hello sign-in</h1>
//     </>
//   )
// }
// export default sign

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./index.css"
const API = "https://crud-api-5f45.onrender.com/signup";

function Signup() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const submit = async (e:React.FormEvent) => {
    e.preventDefault();

    await fetch(API,{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body: JSON.stringify({name,email,password})
    });

    navigate("/login");
  };

  return (
    <form className="auth" onSubmit={submit}>
      <h2>Signup</h2>

      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />

      <button>Sign-in</button>

      <Link to="/login">Login</Link>
    </form>
  );
}

export default Signup;

