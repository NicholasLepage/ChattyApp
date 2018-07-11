import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import MessageList from "./MessageList.jsx";
import Navbar from "./Navbar.jsx";
import { makeId } from "./helperFunctions.jsx"

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: "f74h9r",
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: "ref983",
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }
    this.socket = new WebSocket("ws://localhost:3001")
  }


  addNewMessage = newMessage => {
    let newMessageItem = {
      id: makeId(),
      username: this.state.currentUser.name,
      content: newMessage
    }
    // let oldMessages = this.state.messages;
    // let newMessages = [...oldMessages, newMessageItem]
    // this.setState({messages: newMessages})

    this.socket.send(JSON.stringify(newMessageItem))
  }

  componentDidMount() {

    let ws = this.socket;

    ws.onopen = e => {
      console.log("You're a boss, boi")
    }

    // ws.onmessage = e => {
    //   console.log(JSON.parse(e.data));
    // }

    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }


  render() {
    return (
      <div>
        <Navbar />
        <MessageList messages={this.state.messages}/>
        <ChatBar username={this.state.currentUser.name} addNewMessage={ this.addNewMessage }/>
      </div>
    );
  }
}

export default App;
