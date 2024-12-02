import React, { useState, useCallback, useEffect } from 'react';  
import { Modal, Button, Input, Upload, message, Row, Col, Select } from 'antd';  
import { SmileOutlined, PictureOutlined, EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';  
import { Post } from './post.type';

const { TextArea } = Input;

const PostCreator: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [text, setText] = useState<string>('');
  const [fileList, setFileList] = useState<any[]>([]);
  const [privacy, setPrivacy] = useState<Post['privacy']>('private');
  const [emotion, setEmotion] = useState<Post['emotion']>('happy');
  const [isMediaUploadVisible, setIsMediaUploadVisible] = useState(false);
  const [isEmotionSelectorVisible, setIsEmotionSelectorVisible] = useState(false);
  const [location, setLocation] = useState<string>('');
  const [destinations, setDestinations] = useState<any[]>([]);

  const fetchDestinations = useCallback(async () => {
    try {
      const response = await axios.get('https://be-travel-tc-x28-1end.vercel.app/cities.cityName'); 
      setDestinations(response.data);  
    } catch (error) {
      message.error('Không thể tải danh sách địa điểm');
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      fetchDestinations();  
    }
  }, [isModalOpen, fetchDestinations]);

  const emotions = [
    { label: 'Vui vẻ', value: '😀 vui vẻ', icon: '😀' }, 
    { label: 'Buồn bã', value: '😞 buồn bã', icon: '😞' },
    { label: 'Tức giận', value: '😡 tức giận', icon: '😡' },
    { label: 'Chán nản', value: '😒 chán nản', icon: '😒' },
    { label: 'Ngạc nhiên', value: '😲 ngạc nhiên', icon: '😲' },
  ];

  const handleOk = useCallback(async () => {
    if (!text.trim()) {
      message.warning('Nội dung bài viết không được để trống.');
      return;
    }

    const newPost: Post = {
      content: text,
      img: fileList.length > 0
        ? { url: URL.createObjectURL(fileList[0].originFileObj!), alt: 'Uploaded media' }
        : undefined,
      privacy,
      type: fileList.length > 0 ? 'image' : 'text',
      author: {
        name: 'Người dùng ẩn danh',
        avatar: 'https://api.soctrip.com/storage/files/web/1_00000000-0000-0000-0000-000000000000_defaultAvatar.webp',
      },
      emotion,
      location,
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await axios.post('https://be-travel-tc-x28-1end.vercel.app/post', newPost);

      if (response.status === 201) {
        message.success('Đăng bài viết thành công!');
      }
    } catch (error) {
      message.error('Lỗi khi đăng bài viết.');
      console.error(error);
    }

    setText('');
    setFileList([]);
    setPrivacy('private');
    setEmotion('happy');
    setIsModalOpen(false); 
    setIsMediaUploadVisible(false);
    setIsEmotionSelectorVisible(false);
  }, [text, fileList, privacy, emotion]);

  const handleFileChange = useCallback(({ fileList }: { fileList: any[] }) => {
    setFileList(fileList);
  }, []);

  const toggleMediaUpload = useCallback(() => {
    setIsMediaUploadVisible(prev => !prev);
    setIsEmotionSelectorVisible(false);  
  }, []);

  const toggleEmotionSelector = useCallback(() => {
    setIsEmotionSelectorVisible(prev => !prev);
    setIsMediaUploadVisible(false);  
  }, []);

  return (
    <div>
      <div
        style={{
          background: '#fff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          maxWidth: '600px',
          margin: '10px auto',
        }}
        onClick={() => setIsModalOpen(true)} 
      >
        <div
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: '2px solid orange',
            overflow: 'hidden',
          }}
        >
          <img
            src="https://api.soctrip.com/storage/files/web/1_00000000-0000-0000-0000-000000000000_defaultAvatar.webp"
            alt="User Avatar"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <span style={{ color: '#888' }}>Chào bạn, hãy chia sẻ suy nghĩ của bạn lúc này!</span>
      </div>

      <Modal
        title="Tạo mới bài đăng"
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)} 
        footer={null}
        bodyStyle={{ padding: '20px' }}
        style={{ top: 50 }}
      >
        <TextArea
          placeholder="Chào bạn, hãy chia sẻ suy nghĩ của bạn lúc này!"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          style={{ marginBottom: '20px', borderRadius: '8px', border: '1px solid #d9d9d9' }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
          <Button
            icon={<PictureOutlined />}
            type="link"
            onClick={toggleMediaUpload}
          >
            Ảnh/video
          </Button>
          <Button
            icon={<SmileOutlined />}
            type="link"
            onClick={toggleEmotionSelector}
          >
            Cảm xúc
          </Button>
          <Button
            icon={<EnvironmentOutlined />}
            type="link"
            onClick={() => setIsLocationModalOpen(true)} 
          >
            Check-in
          </Button>

        </div>
        

        {isMediaUploadVisible && (
          <Upload
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
            multiple
            accept="image/*,video/*"
            listType="picture-card"
            style={{ marginBottom: '20px' }}
          >
            {fileList.length < 5 && (
              <div>
                <PictureOutlined />
                <div style={{ marginTop: 8 }}>Tải ảnh/video</div>
              </div>
            )}
          </Upload>
        )}

        {isEmotionSelectorVisible && (
          <Row gutter={16}>
            {emotions.map((emotionObj) => (
              <Col span={8} key={emotionObj.value}>
                <Button
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    backgroundColor: emotion === emotionObj.value ? '#f0f0f0' : '#fff',
                    borderRadius: '8px',
                    border: '1px solid #d9d9d9',
                    marginBottom: '10px',
                  }}
                  onClick={() => setEmotion(emotionObj.value)}
                >
                  {emotionObj.icon}
                  <span style={{ marginLeft: '8px' }}>{emotionObj.label}</span>
                </Button>
              </Col>
            ))}
          </Row>
        )}

      <Modal
        title="Chọn địa điểm"
        open={isLocationModalOpen}
        onCancel={() => setIsLocationModalOpen(false)}
        footer={null}
        style={{ top: 50 }}
      >
        <Select
          value={location}
          onChange={setLocation}
          style={{ width: '100%' }}
          placeholder="Chọn địa điểm"
        >
          {destinations.map((dest: any) => (
            <Select.Option key={dest._id} value={dest.destiName}>
              {dest.destiName}
            </Select.Option>
          ))}
        </Select>
      </Modal>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            onClick={handleOk}
            disabled={!text.trim()}
          >
            Đăng
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PostCreator;
