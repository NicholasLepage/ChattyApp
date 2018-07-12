import React, { Component } from "react";
import Message from "./Message.jsx";

const MessageList = props => {
  // Maps through all messages and displays them.
  const fullMessageList = props.messages.map(message => {
    return (
      <Message
        key={message._id}
        type={message.type}
        username={message.username}
        content={message.content}
      />
    );
  });

  return <main className="messages">{fullMessageList}</main>;
};

export default MessageList;
