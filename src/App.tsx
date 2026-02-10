import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Sign from "./sign-in";
import Dashboard from "./dasboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Sign />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
