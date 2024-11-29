import { Button } from "antd";
import React, { useContext } from "react";

import { LiaEditSolid } from "react-icons/lia";
import EditDetailsContext from "../../context/EditDetailsContext.ts";
interface UserNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const UserNavbar: React.FC<UserNavbarProps> = ({ activeTab, setActiveTab }) => {
  const {editStatus,setEditStatus} = useContext(EditDetailsContext);
  // Sections data
  const tabs = [
    { id: "Posts", label: "Posts" },
    { id: "Followers", label: "Followers" },
    { id: "Library", label: "Library" },
    { id: "Details", label: "Details" },
  ];
    
  return (
    <div className="flex justify-between rounded-lg shadow-lg">
      <ul className="flex space-x-4">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-xl text-gray-800 ${
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
      <Button onClick={() => setEditStatus(!editStatus)} className="px-4 py-2 text-xl text-gray-800"><LiaEditSolid />Update details</Button>
    </div>
  );
};

export default UserNavbar;
