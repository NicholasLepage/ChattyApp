import React, {Component} from 'react';

class ChatBar extends Component {

  messageFromChatbox = event => {
    if (event.key === 'Enter'){
      let enteredMessage = event.target.value;
      this.props.addNewMessage(enteredMessage)
      event.target.value = "";
    };
  }

  usernameFromChatbox = event => {
    if (event.key === 'Enter'){
      let newUser = event.target.value;
      this.props.changeUsername(newUser)
    };
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input onKeyUp={this.usernameFromChatbox} className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.username}/>
          <input onKeyUp={this.messageFromChatbox} name="chatbox" className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      </div>
  )}
}

export default ChatBar;
