import React, { useState, useCallback, useEffect } from 'react';
import { Modal, Button, Input, Upload, message, Row, Col, Select } from 'antd';
import { SmileOutlined, PictureOutlined, EnvironmentOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Post } from './post.type';
import { PostProps } from '../Home';

const { TextArea } = Input;
type PostListProps = {
  setListPost: React.Dispatch<React.SetStateAction<PostProps[]>>; // Function to set the posts state
};
const PostCreator: React.FC<PostListProps> = ({ setListPost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [text, setText] = useState<string>('');
  const [fileList, setFileList] = useState<any[]>([]);
  const [privacy, setPrivacy] = useState<Post['privacy']>('private');
  const [emotion, setEmotion] = useState<Post['emotion']>('');
  const [isMediaUploadVisible, setIsMediaUploadVisible] = useState(false);
  const [isEmotionSelectorVisible, setIsEmotionSelectorVisible] = useState(false);
  const [location, setLocation] = useState<string>('');
  const [destinations, setDestinations] = useState<any[]>([]);

  const fetchDestinations = useCallback(async () => {
    try {
      const response = await axios.get('https://be-travel-tc-x28-1end.vercel.app/cities');
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

    // Lấy thông tin user từ localStorage
    const user = JSON.parse(localStorage.getItem('user') as string);
    if (!user || !user.id) {
      message.error('Không tìm thấy thông tin người dùng.');
      return;
    }

    const newPost: Post = {
      content: text,
      privacy,
      type: fileList.length > 0 ? 'image' : 'text',
      emotion,
      location,
      timestamp: new Date().toISOString(),
      userId: user.id,
    };

    try {
      // Tạo bài viết
      const postResponse = await axios.post('https://be-travel-tc-x28-1end.vercel.app/post', newPost);

      if (postResponse.status === 201) {
        const postId = postResponse.data.post._id; // Giả sử ID bài viết được trả về trong response

        // Nếu có ảnh, upload ảnh lên API khác
        if (fileList.length > 0) {
          const formData = new FormData();
          fileList.forEach(file => {
            formData.append('img', file.originFileObj);
          });

          const imgResponse = await axios.put(`https://be-travel-tc-x28-1end.vercel.app/post/img/${postId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          if (imgResponse.status === 200) {
            message.success('Tải ảnh lên thành công!');
          } else {
            message.error('Lỗi khi tải ảnh lên.');
          }
        }

        message.success('Đăng bài viết thành công!');
        const postsResponse = await axios.get('https://be-travel-tc-x28-1end.vercel.app/post');
        setListPost(postsResponse.data);  
      }
    } catch (error) {
      console.error(error);
    }

    // Reset các trường
    setText('');
    setFileList([]);
    setPrivacy('private');
    setEmotion('');
    setIsModalOpen(false);
    setIsMediaUploadVisible(false);
    setIsEmotionSelectorVisible(false);
  }, [text, fileList, privacy, emotion, location]);

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
        style={{ top: 50, padding: '20px' }}
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
              <Select.Option key={dest._id} value={dest.cityName}>
                {dest.cityName}
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
