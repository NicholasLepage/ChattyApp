import React, { Component } from 'react';

const ChatBar = props => {
  const messageFromChatbox = event => {
    if (event.key === 'Enter') {
      let enteredMessage = event.target.value;
      props.addNewMessage(enteredMessage);
      event.target.value = '';
    }
  };

  const usernameFromChatbox = event => {
    if (event.key === 'Enter') {
      let newUser = event.target.value;
      props.changeUsername(newUser);
    }
  };

  return (
    <div>
      <footer className="chatbar">
        <input
          onKeyUp={usernameFromChatbox}
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          defaultValue={props.username}
        />
        <input
          onKeyUp={messageFromChatbox}
          name="chatbox"
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    </div>
  );
};

export default ChatBar;
