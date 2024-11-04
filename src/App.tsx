import Home from "./components/Home";

import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/components/Login";
import Register from "./pages/auth/components/Register";

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />}>
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default App;
