import React, {Component} from 'react';

class ChatBar extends Component {

  enterKey = event => {
    let enteredMessage = event.target.value;
    if (event.key == 'Enter'){
      this.props.addNewMessage(enteredMessage)
      event.target.value = "";
    };
  }

  render() {
    return (
      <div>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.username}/>
          <input onKeyUp={this.enterKey} name="chatbox" className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      </div>
  )}
}

export default ChatBar;
