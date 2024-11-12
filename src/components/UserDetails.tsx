import { Button } from 'antd';
import React, { useState } from 'react'

const UserDetails:React.FC = ({userData}) => {
  // State to track which section is active
  const [activeSection, setActiveSection] = useState("Overview");

  // Sections data
  const sections = [
    { id: "Overview", label: "Overview" },
    { id: "Contact", label: "Contact" },
    { id: "Details", label: "Details" },
  ];
  
  const renderSectionContent = () => {
    switch (activeSection) {
      default:
        return <div>
          <p>Pronouns: </p>
          <p>DOB: </p>
          <p>Workplaces: </p>
          <p>Relationships: </p>
        </div>;
      case "Contact":
        return <div>
          <p>Phone:</p>
          <p>Email: </p>
          <p>Other socials: </p>
        </div>
      case "Details":
        return <div>
          <p>Birth country: </p>
          <p>Nationality </p>
          <p>Education </p>
          <p>Email: </p>
          <Button>Change password </Button>
        </div>;
    }
  };
  return (
      <div className="userdetailssection rounded-lg shadow mt-10">
        <div className="flex">
        {/* Left Sidebar Navigation */}
        <div className="w-1/4 p-4 border-r">
          <h2 className="font-semibold text-lg mb-4">About</h2>
          <ul>
            {sections.map(section => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`block w-full text-left px-4 py-2 mb-2 rounded ${
                    activeSection === section.id ? "bg-red-500 text-white" : "text-gray-700"
                  }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-3/4 p-4">
          <h2 className="font-semibold text-lg mb-4">{activeSection}</h2>
          <div>{renderSectionContent()}</div>
        </div>
    </div>
      </div>
  )
}

export default UserDetails
