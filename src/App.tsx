import Home from "./components/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/auth/Auth.js";
import Login from "./pages/auth/components/Login.js";
import Register from "./pages/auth/components/Register.js";
import UserDetails from "./components/UserDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      {/* <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> */}

      <Route path="/profile" element={<UserDetails />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default App;
