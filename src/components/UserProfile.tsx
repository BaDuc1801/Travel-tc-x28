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
  }, [activeTab]);

  // API intergration
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Async function to fetch data
    const fetchData = async () => {
      try {
        const response = await fetch('https://be-travel-tc-x28-1end.vercel.app/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log('An error occurred while fetching user data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();  // Call the fetch function
  }, []);

  // TODO: SELECT in db to fetch specific data from server, nodemailer to send email from system

  const renderTabsContent = () => {
    switch (activeTab) {
        case "Posts":
            return <div>No post yet.</div>
        case "Followers":
            return <div>No follower yet.</div>
        case "Library":
            return <div>No picture yet.</div>
        case "Details":
            return <UserDetails/>
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
