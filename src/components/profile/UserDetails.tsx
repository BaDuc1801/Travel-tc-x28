import { Button } from "antd";
import React, { useState, useContext } from "react";
import EditDetailsContext from "../../context/EditDetailsContext.ts";

const UserDetails: React.FC<{ userData: any }> = ({ userData }) => {
  // State to track which section is active
  const [activeSection, setActiveSection] = useState("Overview");
  const { editStatus } = useContext(EditDetailsContext)

  const renderArray = (array: any[]) => {
    if (!array || array.length == 0) return <span> None</span>;
    {
      return array.map((item, index) => (
        <span key={index} className="ml-1">{item}</span>
      ));
    }
  };

  // Sections data
  const sections = [
    { id: "Overview", label: "Overview" },
    { id: "Contact", label: "Contact" },
    { id: "Details", label: "Details" },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      default:
        return (
          <div>
            <p>Pronouns: {userData?.pronoun} {editStatus ? <p>THIS IS THE CONTEXT TEST IF TRUE</p> : <p> IF FALSE</p>}</p>
            <p>DOB: {userData?.dob} </p>
            <p>Workplaces: {renderArray(userData?.workplaces)} </p>
            <p>Relationships: {userData?.relationship} </p>
          </div>
        );
      case "Contact":
        return (
          <div>
            <p>Phone: {userData?.phone}</p>
            <p>Email: {userData?.email} </p>
            <p>Other socials:{renderArray(userData?.socials)} </p>
          </div>
        );
      case "Details":
        return (
          <div>
            <p>Birth country: {userData?.cob}</p>
            <p>Nationality: {userData?.nationality} </p>
            <p>Education:{renderArray(userData?.education)} </p>
            <p>Email: {userData?.email} </p>
            <Button>Change password </Button>
          </div>
        );
    }
  };
  return (
    <div className="userdetailssection mt-10 rounded-lg shadow">
      <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="w-1/4 border-r p-4">
          <h2 className="mb-4 text-lg font-semibold">About</h2>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`mb-2 block w-full rounded px-4 py-2 text-left ${
                    activeSection === section.id
                      ? "bg-red-500 text-white"
                      : "text-gray-700"
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 p-4">
          <h2 className="mb-4 text-lg font-semibold">{activeSection}</h2>
          <div className="h-screen">{renderSectionContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
