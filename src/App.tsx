import Home from "./components/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import ListPosts from "./components/posts&comments/ListPosts.tsx";
import Auth from "./components/Auth.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import UserProfile from "./components/UserProfile.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="" element={<ListPosts/>} />
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route> 

      <Route path="/profile" element={<UserProfile />} />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};

export default App;
