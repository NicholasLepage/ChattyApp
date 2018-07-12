import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Navbar from "./Navbar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Anonymous", color: "black" },
      messages: [],
      onlineUsers: null
    };
    this.socket = new WebSocket("ws://localhost:3001");
  }

  // Sends a message to the WebSocket when pressing enter in the chatbar.
  addNewMessage = newMessage => {
    let newMessageItem = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: newMessage
    };

    this.socket.send(JSON.stringify(newMessageItem));
  };

  // Changes the state of "currentUser" when pressing enter in chatbar-username
  changeUsername = newUsername => {
    let newNotification = {
      type: "postNotification",
      content: `${
        this.state.currentUser.name
      } changed their name to ${newUsername}`
    };

    this.setState({ currentUser: { name: newUsername } });

    this.socket.send(JSON.stringify(newNotification));
  };

  componentDidMount() {
    let ws = this.socket;

    ws.onopen = e => {
      console.log("WebSocket Connected");
    };

    // Receives broadcasted message and adds the new message to the state's list of all messages.
    ws.onmessage = e => {
      let msg = JSON.parse(e.data);

      const storeMessage = incomingMsg => {
        let oldMessages = this.state.messages;
        let newMessages = [...oldMessages, incomingMsg];
        this.setState({ messages: newMessages });
      };

      switch (msg.type) {
        case "incomingMessage":
          storeMessage(msg);

          break;

        case "incomingNotification":
          storeMessage(msg);

          break;

        case "incomingSize":
          this.setState({ onlineUsers: msg.online });

        default:
          break;
      }
    };
  }

  render() {
    return (
      <div>
        <Navbar onlineUsers={this.state.onlineUsers} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          username={this.state.currentUser.name}
          addNewMessage={this.addNewMessage}
          changeUsername={this.changeUsername}
        />
      </div>
    );
  }
}

export default App;
