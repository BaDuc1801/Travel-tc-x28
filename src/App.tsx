import { Route, Routes, Navigate } from "react-router-dom";
import Auth from "./components/Auth.tsx";
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Explore from "./components/Explore.tsx";
import Home from "./components/Home.tsx";
import Layout from "./components/Layout.tsx";
import UserProfile from "./components/UserProfile.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
      </Route>
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
