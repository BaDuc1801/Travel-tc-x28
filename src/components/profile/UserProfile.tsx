// TODO: 
// gán biến user với biến trong localstorage và dùng useEffect để re-render mỗi khi biến user thay đổi.
// SELECT in db to fetch specific data from server, nodemailer to send email from system
// https://be-travel-tc-x28-1end.vercel.app/user
import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails.tsx";
import UserPics from "./UserPics.tsx";
import UserNavbar from "./UserNavbar.tsx";
import {useSearchParams } from "react-router-dom";
import axios from "axios";

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   profilePic: object;

// }

const UserProfile:React.FC<{userId: string}> = ({userId}) => {
  // tab persistence
  const [searchParams, setSearchParams] = useSearchParams();
  const initTab = searchParams.get('tab') || "Posts"
  const [activeTab, setActiveTab] = useState(initTab);

  useEffect(()=> {
    setSearchParams({tab:activeTab});
  }, [activeTab]);

  // fetch user data based on user id
const fetchUserData = async (userId: string) => {
  try {
    const response = await axios.get(`http://localhost:8080/user/${userId}`)
    console.log(response);
    
    return response;
  } catch (e) {
    console.log('fetchUserData error: ', e);
    
  }
};

const [userData, setUser] = useState<any| null>(null);


useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData(userId);
        setUser(userData);

      } catch (e) {
        console.log(e);
      }
    }
    getUserData();
}, [userId]);

  const renderTabsContent = () => {
    switch (activeTab) {
        case "Posts":
            return <div>No post yet.</div>
        case "Followers":
            return <div>No follower yet.</div>
        case "Library":
            return <div>No picture yet.</div>
        case "Details":
            return <UserDetails userData={userData}/>
        default:
            return <div></div>
    }
  }
  return (
      <div className="bg-red-900">
      
      <div className="mx-auto flex w-5/6 flex-col justify-center bg-white">
        <div>
          <UserPics />
        </div>

        <div>
          <UserNavbar activeTab={activeTab} setActiveTab={setActiveTab}/> 
        </div>
        
        <div>
          {renderTabsContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
