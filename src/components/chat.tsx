import React, { useState, useEffect, useRef } from 'react';
import { IoIosSend } from 'react-icons/io';

// Định nghĩa kiểu tin nhắn
interface ChatMessage {
  id: number;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: number;
}

// Định nghĩa thông tin người dùng
interface User {
  id: string;
  name: string;
}

const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [currentUser, setCurrentUser] = useState<User>({ id: 'user1', name: 'User 1' });
  const [recipient, setRecipient] = useState<User>({ id: 'user2', name: 'User 2' });
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Hàm gửi tin nhắn
  const sendMessage = () => {
    if (input.trim() === '') return;

    const newMessage: ChatMessage = {
      id: Date.now(),
      text: input,
      senderId: currentUser.id,
      receiverId: recipient.id,
      timestamp: Date.now(),
    };

    // Cập nhật danh sách tin nhắn với tin nhắn mới
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, newMessage];
      updatedMessages.sort((a, b) => a.timestamp - b.timestamp);  // Sắp xếp theo thời gian gửi
      return updatedMessages;
    });

    setInput('');
  };

  // Cuộn tự động xuống khi có tin nhắn mới
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Hàm để tạo tin nhắn giả lập cho demo
  const generateDemoMessages = () => {
    const demoMessages: ChatMessage[] = [
      {
        id: 1,
        text: 'Chào bạn!',
        senderId: 'user1',
        receiverId: 'user2',
        timestamp: Date.now() - 10000,
      },
      {
        id: 2,
        text: 'Chào, bạn khỏe không?',
        senderId: 'user2',
        receiverId: 'user1',
        timestamp: Date.now() - 8000,
      },
      {
        id: 3,
        text: 'Mình ổn, cảm ơn bạn. Bạn thì sao?',
        senderId: 'user1',
        receiverId: 'user2',
        timestamp: Date.now() - 6000,
      },
      {
        id: 4,
        text: 'Mình cũng khỏe, cảm ơn bạn đã hỏi!',
        senderId: 'user2',
        receiverId: 'user1',
        timestamp: Date.now() - 4000,
      },
      {
        id: 5,
        text: 'Đã lâu không gặp. Cùng hẹn nhau gặp mặt nhé!',
        senderId: 'user1',
        receiverId: 'user2',
        timestamp: Date.now() - 2000,
      },
    ];

    setMessages(demoMessages);
  };

  useEffect(() => {
    generateDemoMessages();
  }, []);

  return (
    <div className="flex flex-col w-100 h-96 border border-gray-300 rounded-lg shadow-lg bg-white">
      <div ref={chatBoxRef} className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === currentUser.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.senderId === currentUser.id ? 'bg-blue-500 text-white ml-8' : 'bg-gray-300 mr-8'
              }`}
            >
              <p>{message.text}</p>
              <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex p-2 border-t border-gray-300">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="w-full p-2 border border-gray-300 rounded-md resize-none"
        />
        <div
          onClick={sendMessage}
          className="text-blue-500 flex items-center justify-center text-3xl cursor-pointer ml-2 rounded-md"
        >
          <IoIosSend />
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
