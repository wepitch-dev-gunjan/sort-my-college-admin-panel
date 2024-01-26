import { useState } from 'react';
import './style.scss';
import { IoMdSend } from "react-icons/io";

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="ChatInput-container">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder='Enter your query'
      />
      <div className="send-icon" onClick={sendMessage}>
        <IoMdSend />
      </div>
    </div>
  );
};

export default ChatInput;
