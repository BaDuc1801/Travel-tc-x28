import React, { useState } from "react";
import UserDetails from "./UserDetails";
import UserPics from "./UserPics";
import UserNavbar from "./UserNavbar";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  // Sections data
  const tabs = [
    { id: "Posts", label: "Posts" },
    { id: "Followers", label: "Followers" },
    { id: "Gallery", label: "Gallery" },
    { id: "Details", label: "Details" },
  ];

  const renderTabsContent = () => {
    switch (activeTab) {
        case "Posts":
            return <div></div>
        case "Followers":
            return <div></div>
        case "Gallery":
            return <div></div>
        case "Details":
            return <div><UserDetails/></div>
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
        {/* <UserNavbar/> */}
        <div className="rounded-lg shadow-lg">
          <ul className="flex space-x-4">
            {tabs.map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-gray-800 ${
                    activeTab === tab.id
                      ? "border-b-2 border-red-500"
                      : "border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div>
        {renderTabsContent()}
      </div>
    </div>
  );
};

export default UserProfile;
