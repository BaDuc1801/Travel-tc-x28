// import React, { useState, useEffect, useRef } from 'react';
// import { IoIosSend } from 'react-icons/io';

// // Định nghĩa kiểu tin nhắn
// interface ChatMessage {
//   id: number;
//   text: string;
//   senderId: string;
//   receiverId: string;
//   timestamp: number;
// }

// // Định nghĩa thông tin người dùng
// interface User {
//   id: string;
//   name: string;
// }

// const ChatApp: React.FC = () => {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState('');
//   const [currentUser, setCurrentUser] = useState<User | null>(null);
//   const [recipient, setRecipient] = useState<User | null>(null);
//   const chatBoxRef = useRef<HTMLDivElement>(null);

//   // Hàm gửi tin nhắn
//   const sendMessage = async () => {
//     if (input.trim() === '') return;

//     if (!currentUser || !recipient) return; 

//     const newMessage: ChatMessage = {
//       id: Date.now(),
//       text: input,
//       senderId: currentUser.id,
//       receiverId: recipient.id,
//       timestamp: Date.now(),
//     };

//     // Gửi tin nhắn đến server
//     try {
//       const response = await fetch('http://localhost:8080/chat/send-message', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           sender: currentUser.id,
//           receiver: recipient.id,
//           message: input,
//         }),
//       });

//       if (response.ok) {
//         // Cập nhật danh sách tin nhắn với tin nhắn mới
//         setMessages((prevMessages) => {
//           const updatedMessages = [...prevMessages, newMessage];
//           updatedMessages.sort((a, b) => a.timestamp - b.timestamp);  // Sắp xếp theo thời gian gửi
//           return updatedMessages;
//         });
//       } else {
//         console.error('Failed to send message');
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//     }

//     setInput('');
//   };

//   // Cuộn tự động xuống khi có tin nhắn mới
//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   // Lấy cuộc trò chuyện từ backend
//   useEffect(() => {
//     const fetchConversation = async () => {
//       if (!currentUser || !recipient) return;

//       try {
//         const response = await fetch(
//           `http://localhost:8080/chat/conversation?sender=${currentUser.id}&receiver=${recipient.id}`
//         );
//         if (response.ok) {
//           const conversation = await response.json();
//           setMessages(conversation.messages);
//         } else {
//           console.error('Failed to fetch conversation');
//         }
//       } catch (error) {
//         console.error('Error fetching conversation:', error);
//       }
//     };

//     fetchConversation();
//   }, [currentUser, recipient]);

//   // Lấy currentUser và recipient từ localStorage khi component mount
//   useEffect(() => {
//     const storedCurrentUser = JSON.parse(localStorage.getItem('user') || '{}');
//     const storedRecipient = JSON.parse(localStorage.getItem('reply') || '{}');

//     if (storedCurrentUser) {
//       setCurrentUser(JSON.parse(storedCurrentUser.id));
//     }

//     if (storedRecipient) {
//       setRecipient(JSON.parse(storedRecipient));
//     }
//   }, []);

//   return (
//     <div className="flex flex-col w-100 h-96 border border-gray-300 rounded-lg shadow-lg bg-white">
//       <div ref={chatBoxRef} className="flex-1 p-4 overflow-y-auto space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
//           >
//             <div
//               className={`max-w-xs p-3 rounded-lg ${
//                 message.senderId === currentUser?.id ? 'bg-blue-500 text-white ml-8' : 'bg-gray-300 mr-8'
//               }`}
//             >
//               <p>{message.text}</p>
//               <span className="text-xs text-gray-500">{new Date(message.timestamp).toLocaleTimeString()}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex p-2 border-t border-gray-300">
//         <textarea
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Nhập tin nhắn..."
//           className="w-full p-2 border border-gray-300 rounded-md resize-none"
//         />
//         <div
//           onClick={sendMessage}
//           className="text-blue-500 flex items-center justify-center text-3xl cursor-pointer ml-2 rounded-md"
//         >
//           <IoIosSend />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;
