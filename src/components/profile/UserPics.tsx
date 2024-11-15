import { Button, Modal } from "antd";
import React, { useState } from "react";

const UserPics: React.FC<{userData: any}> = ({userData}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className="w-full rounded-lg bg-white shadow-lg">
        <img
          className="h-[200px] w-full bg-cover bg-center"
          src={userData ? userData.profilePic : "https://picsum.photos/400" }
          alt=""
        />
      </div>
      <div className="-mt-60 flex flex-col items-center justify-center">
        <img
          src={"https://picsum.photos/1000"}
          alt="Profile picture"
          className="h-60 w-60 rounded-full border-4 border-white object-cover"
          onClick={showModal}
        />
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button className="border-red-600 text-red-700" key="cancel" onClick={handleCancel}>Cancel</Button>,
            <Button className="text-white-500 bg-red-600" key="submit" type="primary" onClick={handleOk}>Set avatar</Button>
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <div className="p-2 text-4xl font-bold">{userData ? userData.name : "David Lorem"}</div>
      </div>
    </div>
  );
};

export default UserPics;
