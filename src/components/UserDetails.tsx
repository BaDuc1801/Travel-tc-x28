import { Modal } from 'antd';
import React, { useState } from 'react'

const UserDetails:React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // State to track which section is active
  const [activeSection, setActiveSection] = useState("Overview");

  // Sections data
  const sections = [
    { id: "Overview", label: "Overview" },
    { id: "Work", label: "Work and Education" },
    { id: "Places", label: "Places Lived" },
    { id: "Contact", label: "Contact and Basic Info" },
    { id: "Family", label: "Family and Relationships" },
    { id: "Details", label: "Details About Alex" },
    { id: "LifeEvents", label: "Life Events" },
  ];
  
  const renderSectionContent = () => {
    switch (activeSection) {
      case "Overview":
        return <p>Overview content goes here...</p>;
      case "Work":
        return <p>Work and Education content goes here...</p>;
      case "Places":
        return <p>Places Lived content goes here...</p>;
      case "Contact":
        return <p>Contact and Basic Info content goes here...</p>;
      case "Family":
        return <p>Family and Relationships content goes here...</p>;
      case "Details":
        return <p>Details About Alex content goes here...</p>;
      case "LifeEvents":
        return <p>Life Events content goes here...</p>;
      default:
        return <p>Select a section to view content</p>;
    }
  };
  return (
    <div className='mx-10'>
      <div className="w-1/3 bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Background Image */}
        <img onClick={showModal} className='w-full h-[200px] bg-cover bg-center' src="https://picsum.photos/300" alt="" />

        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
        {/* Profile Picture */}
        <div className="flex flex-col items-center justify-center -mt-60">
          <img src={"https://picsum.photos/500"} alt="Profile picture" className="w-60 h-60 rounded-full border-4 border-white object-cover"
          />
          <div className='p-2 font-bold text-4xl'>David Lorem</div>
        </div>
      </div>

      <div className="userdetailssection">
        
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
        {/* <div className="user-nav">

        </div>
        <div className="userdetail">
        
        </div> */}
      </div>
    </div>
  )
}

export default UserDetails
