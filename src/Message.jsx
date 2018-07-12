import React, { Component } from "react";

const Message = props => {
  console.log();
  switch (props.type) {
    case "incomingMessage":
      return (
        <div className="message">
          <span className="message-username">{props.username}</span>
          <span className="message-content">{props.content}</span>
        </div>
      );

    case "incomingNotification":
      return (
        <div className="notification">
          <span className="message system">{props.content}</span>
        </div>
      );
    default:
      break;
  }
};

export default Message;
