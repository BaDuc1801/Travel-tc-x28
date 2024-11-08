import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url('/home.jpg')` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className=" relative w-screen h-screen flex justify-center items-center">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Auth;
