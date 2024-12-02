// TODO:
// update userinfo from fe to server
// nodemailer to send email from system
// https://be-travel-tc-x28-1end.vercel.app/user

import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails.tsx";
import UserPics from "./UserPics.tsx";
import UserNavbar from "./UserNavbar.tsx";
import { useParams, useSearchParams } from "react-router-dom";
import  EditDetailsContext from "../../context/EditDetailsContext.ts";
import axios from "axios";
import { Obj } from "../../interface/index.ts";

const UserProfile: React.FC = () => {
  // tab persistence
  const [searchParams, setSearchParams] = useSearchParams();
  const initTab = searchParams.get("tab") || "Posts";
  const [activeTab, setActiveTab] = useState(initTab);
  const { id } = useParams();
  const userId = (id || "").toString();
  const [editStatus, setEditStatus] = useState<boolean>(false);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab]);

  // fetch user data based on user id
  const fetchUserData = async (userId: string | undefined) => {
    try {
      if (!userId) {
        return;
      }
      const response = await axios.get(`http://localhost:8080/user/${userId}`);
      console.log("fetchUserData: ", response);

      return response.data;
    } catch (e) {
      console.log("fetchUserData error: ", e);
    }
  };

  const [userData, setUserData] = useState<Obj>({});
  console.log("userData: ", userData);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await fetchUserData(id);
        setUserData(user);
      } catch (e) {
        console.log(e);
      }
    };
    getUserData();
  }, [userId]);

  const renderTabsContent = () => {
    switch (activeTab) {
      case "Posts":
        return <div className="h-screen">No post yet.</div>;
      case "Followers":
        return <div className="h-screen">No follower yet.</div>;
      case "Library":
        return <div className="h-screen">No picture yet.</div>;
      case "Details":
        return (
          
            <div className="h-screen">
              <UserDetails userData={userData} />
            </div>
        );
      default:
        return <div></div>;
    }
  };
  return (
    <EditDetailsContext.Provider value={{ editStatus, setEditStatus }}>
    <div className="bg-red-900">
      <div className="mx-auto flex w-5/6 flex-col justify-center bg-white">
        <div>
          <UserPics userData={userData} />
        </div>

        <div>
          <EditDetailsContext.Provider value={{ editStatus, setEditStatus }}>
            <UserNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
          </EditDetailsContext.Provider>
        </div>

        <div>{renderTabsContent()}</div>
      </div>
    </div>
    </EditDetailsContext.Provider>
  );
};

export default UserProfile;
