import { useState,useEffect } from "react";
import { User } from "./dasboard";

interface Props{
  editingUser:User|null;
  onSave:(u:Partial<User>)=>void;
  onClose:()=>void;
}

function UserModal({editingUser,onSave,onClose}:Props){
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [department,setDepartment] = useState("");

  useEffect(()=>{
    if(editingUser){
      setName(editingUser.name);
      setEmail(editingUser.email);
      setDepartment(editingUser.department);
    }
  },[editingUser]);

  const submit=(e:React.FormEvent)=>{
    e.preventDefault();
    onSave({name,email,department});
  };

  return(
    <div className="modal">
      <form className="modal-box" onSubmit={submit}>
        <h3>{editingUser?"Edit":"Add"} User</h3>

        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name"/>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        <input value={department} onChange={e=>setDepartment(e.target.value)} placeholder="Department"/>

        <button>Save</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
}

export default UserModal;
