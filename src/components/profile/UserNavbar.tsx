import React from "react";
interface UserNavbarProps {
  activeTab: string;
  setActiveTab: (tab:string) => void;
}

const UserNavbar: React.FC<UserNavbarProps> = ({activeTab, setActiveTab}) => {
  // Sections data
  const tabs = [
    { id: "Posts", label: "Posts" },
    { id: "Followers", label: "Followers" },
    { id: "Library", label: "Library" },
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
