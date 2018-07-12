import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Navbar from "./Navbar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: "Bob" },
      messages: []
    };
    this.socket = new WebSocket("ws://localhost:3001");
  }

  // Sends a message to the WebSocket when pressing enter in the chatbar.
  addNewMessage = newMessage => {
    let newMessageItem = {
      username: this.state.currentUser.name,
      content: newMessage
    };

    this.socket.send(JSON.stringify(newMessageItem));
  };

  // Changes the state of "currentUser" when pressing enter in chatbar-username
  changeUsername = newUsername => {
    this.setState({ currentUser: { name: newUsername } });
  };

  componentDidMount() {
    let ws = this.socket;

    ws.onopen = e => {
      console.log("WebSocket Connected");
    };

    // Receives broadcasted message and adds the new message to the state's list of all messages.
    ws.onmessage = e => {
      const msg = JSON.parse(e.data);
      let oldMessages = this.state.messages;
      let newMessages = [...oldMessages, msg];
      this.setState({ messages: newMessages });
    };

    // TODO: REMOVE.   Simulates a message when opening the app.
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {
        _id: 3,
        username: "Michelle",
        content: "Hello there!"
      };
      const messages = this.state.messages.concat(newMessage);
      this.setState({ messages: messages });
    }, 3000);
  }

  render() {
    return (
      <div>
        <Navbar />
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
