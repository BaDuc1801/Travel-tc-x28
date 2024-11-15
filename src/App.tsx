import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./components/Auth.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";

const App = () => {
  return (
    <Routes>
    
      {/* Route cho auth */}
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Route không tìm thấy */}
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default App;