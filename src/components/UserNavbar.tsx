import React, { useState } from "react";

function UserNavbar() {
  const [activeTab, setActiveTab] = useState("Posts");

  // Sections data
  const tabs = [
    { id: "Posts", label: "Posts" },
    { id: "Followers", label: "Followers" },
    { id: "Gallery", label: "Gallery" },
    { id: "Details", label: "Details" },
  ];
  return (
    <div className="rounded-lg shadow-lg">
        <ul className="flex space-x-4">
        {tabs.map(tab => (
              <li key={tab.id}>
                <button 
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-gray-800 ${
                    activeTab === tab.id ? "border-b-2 border-red-500" : "border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              </li>
            ))}
        </ul>
    </div>
      
    )
}

export default UserNavbar;
