import React, { useEffect, useState } from "react";
import UserDetails from "./UserDetails";
import UserPics from "./UserPics";
import UserNavbar from "./UserNavbar";
import { useSearchParams } from "react-router-dom";

const UserProfile:React.FC = () => {
  // tab persistence
  const [searchParams, setSearchParams] = useSearchParams();
  const initTab = searchParams.get('tab') || "Posts"
  const [activeTab, setActiveTab] = useState(initTab);

  useEffect(()=> {
    setSearchParams({tab:activeTab});
  }, [activeTab,setActiveTab]);

  // TODO: use useSearchParams to persist navbar info, 
  // SELECT in db to fetch specific data from server, nodemailer to send email from system

  const renderTabsContent = () => {
    switch (activeTab) {
        case "Posts":
            return <div></div>
        case "Followers":
            return <div></div>
        case "Gallery":
            return <div></div>
        case "Details":
            return <UserDetails/>
        default:
            return <div></div>
    }
  }
  return (
    <div className="mx-auto flex w-5/6 flex-col justify-center">
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
  );
};

export default UserProfile;
