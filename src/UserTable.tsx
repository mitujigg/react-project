import { User } from "./Dashboard";

interface Props{
  users:User[];
  onEdit:(u:User)=>void;
  onDelete:(id:string)=>void;
}

function UserTable({users,onEdit,onDelete}:Props){
  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Dept</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map(u=>(
          <tr key={u.id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.department}</td>
            <td>
              <button onClick={()=>onEdit(u)}>Edit</button>
              <button onClick={()=>onDelete(u.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
