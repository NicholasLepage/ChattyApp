import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Navbar from "./Navbar.jsx";

class App extends Component {
  constructor(props) {
    super(props);

    // TODO: Implement random colours for each user.
    // let randomColour = [rgb(54,112,138), rgb(121,71,71), rgb(187,178,41), rgb(115,82,127), rgb(104,219,139)]

    this.state = {
      currentUser: { name: "Anonymous" },
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

      const scrollToBottom = () => {
        window.scrollTo(0,document.body.scrollHeight);
      }

      switch (msg.type) {
        case "incomingMessage":
          let regex = (/\.(gif|jp?g|png|svg|bmp|tiff|bat)$/i);
          if (regex.test(msg.content)) {
            msg.type = "image";
          }
          storeMessage(msg);
          scrollToBottom();

          break;

        case "incomingNotification":
          storeMessage(msg);
          scrollToBottom();

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
