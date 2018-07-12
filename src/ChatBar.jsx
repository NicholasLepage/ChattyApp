import React, { Component } from "react";

const ChatBar = props => {
  // When pressing enter in chatbar-message, use the addNewMessage function + resets chatbox to be empty.
  const messageFromChatbox = event => {
    // Prevents users from submitting empty messages (Spam prevention)
    if (event.key === "Enter" && event.target.value !== "") {
      let enteredMessage = event.target.value;
      props.addNewMessage(enteredMessage);
      event.target.value = "";
    }
  };

  // When pressing enter in chatbar-username, use the changeUsername function to set the currentUser to the new value.
  const usernameFromChatbox = event => {
    if (event.key === "Enter") {
      // If user leaves input blank, it will revert it back to their current username.
      if (event.target.value === "") {
        event.target.value = props.username;
      } else {
        let newUser = event.target.value;
        props.changeUsername(newUser);
      }
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
