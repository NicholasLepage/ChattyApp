import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render() {

    const fullMessageList = this.props.messages.map((message) => {
      return <div key={message.id} className="message">
               <span className="message-username">{message.username}</span>
               <span className="message-content">{message.content}</span>
             </div>
    })

    return (
      <main className="messages">
        <Message />
        {fullMessageList}
      </main>
    );
  }
}


export default MessageList;
