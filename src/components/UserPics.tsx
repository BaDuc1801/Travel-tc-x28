import { Modal } from 'antd';
import React, { useState } from 'react'

function UserPics() {
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
  return (
    <div>
      <div className="w-full bg-white rounded-lg shadow-lg" onClick={showModal}>
        {/* Background Image */}
        <img className='w-full h-[200px] bg-cover bg-center' src="https://picsum.photos/300" alt="" />

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
    </div>
  )
}

export default UserPics
