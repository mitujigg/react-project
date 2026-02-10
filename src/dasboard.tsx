// function dasboard() {
//   return (
//     <>
//            <h1>hello dasboard</h1>
//     </>
//   )
// }
// export default dasboard


import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./dasboard.css"
interface User {
  id: string;
  name: string;
  email: string;
  department: string;
}

const API = "https://crud-api-5f45.onrender.com";

function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ================= LOAD USERS =================
  const loadUsers = useCallback(async () => {
    try {
      const res = await fetch(`${API}/dashboard/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setUsers(data);
    } catch {
      alert("Failed to load users");
    }
  }, [token]);

  // ================= AUTH CHECK =================
useEffect(() => {

  if (!token) {
    navigate("/login");
    return;
  }

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/dashboard/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setUsers(data);

    } catch {
      alert("Failed to load users");
    }
  };

  fetchUsers();

}, [token, navigate]);

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }

   const fetchUsers = async () => {
      await loadUsers();
    };

   fetchUsers();



  //   loadUsers();
  // }, [token, navigate, loadUsers]);

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ================= OPEN ADD MODAL =================
  const openAddModal = () => {
    setEditingUser(null);
    setName("");
    setEmail("");
    setDepartment("");
    setShowModal(true);
  };

  // ================= OPEN EDIT MODAL =================
  const openEditModal = (user: User) => {
    setEditingUser(user);
    setName(user.name);
    setEmail(user.email);
    setDepartment(user.department);
    setShowModal(true);
  };

  // ================= SAVE USER =================
  const saveUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingUser
      ? `${API}/dashboard/user/${editingUser.id}`
      : `${API}/dashboard/user`;

    const method = editingUser ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name, email, department })
    });

    setShowModal(false);
    loadUsers();
  };

  // ================= DELETE USER =================
  const deleteUser = async (id: string) => {
    await fetch(`${API}/dashboard/user/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    loadUsers();
  };

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <button onClick={logout}>Logout</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="content">

        <button onClick={openAddModal}>Add User</button>

        {/* USERS TABLE */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.department}</td>
                <td>
                  <button onClick={() => openEditModal(u)}>Edit</button>
                  <button onClick={() => deleteUser(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </main>

      {/* MODAL */}
      {showModal && (
        <div className="modal">
          <form className="modal-box" onSubmit={saveUser}>
            <h3>{editingUser ? "Edit User" : "Add User"}</h3>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />

            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Department"
            />

            <button>Save</button>
            <button type="button" onClick={() => setShowModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Dashboard;