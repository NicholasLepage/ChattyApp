import React, {Component} from 'react';
import Message from './Message.jsx';


class MessageList extends Component {

  render() {

    const fullMessageList = this.props.messages.map((message) => {
      return <Message key={message.id} username={message.username} content={message.content}/>
    })

    return (
      <main className="messages">
        {fullMessageList}
      </main>
    );
  }
}

export default MessageList;
