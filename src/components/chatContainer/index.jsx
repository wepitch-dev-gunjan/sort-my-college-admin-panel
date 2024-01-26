import React, { useContext, useEffect, useState } from 'react';
import './style.scss';
import ChatInput from './chatInput';
import ChatBox from './chatBox';
import { HelpContext } from '../../context/HelpContext';
import { useSocket } from '../../context/SocketContext';

const ChatContainer = () => {
  const { chats, setChats } = useContext(HelpContext);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      // Example: Listen for events
      console.log('socket is connected');
      socket.emit('join', '1234');
      socket.on("chat-message", (message) => {
        // Handle incoming message
        setChats(prev => [...prev, message]);
      });
    }
  }, [socket]);

  return (
    <div className='ChatContainer-container'>
      <div className="main-container">
        {chats.map((chat, i) => (
          <ChatBox key={i} chat={chat} />
        ))}
      </div>
      <div className="input-container">
        <ChatInput onSend={(input) => socket.emit("send-message", {
          room_id: "1234",
          message: {
            text: input,
            user: false
          }
        })} />
      </div>
    </div>
  );
};

export default ChatContainer;
