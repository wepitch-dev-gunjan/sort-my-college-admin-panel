import React from 'react'
import './style.scss'

const ChatBox = ({ chat }) => {

  return (
    <div className={`ChatBox-container ${chat.user ? 'right-align' : 'left-align'}}`}>
      <div className={`chat ${chat.user ? 'user' : 'admin'}`}>
        <p>
          {chat.text}
        </p>
      </div>
    </div>
  )
}

export default ChatBox
