import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ChatManager, TokenProvider } from '@pusher/chatkit';

import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import OnlineList from './OnlineList';

const ROOM_ID = 9742399;

export default class Chat extends Component {
  state = {
    currentUser: null,
    currentRoom: {},
    messages: [],
  };

  constructor(props) {
    super(props);

    this.onSend = this.onSend.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async componentDidMount() {
    const chatKit = new ChatManager({
      instanceLocator: 'v1:us1:39e44a7f-7cdc-4a28-8dde-2e32a2d93ff8',
      userId: this.props.currentId,
      tokenProvider: new TokenProvider({
        url:
          'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/39e44a7f-7cdc-4a28-8dde-2e32a2d93ff8/token',
      }),
    });

    try {
      const currentUser = await chatKit.connect();
      this.setState({ currentUser });
      console.log('Bleep bloop 🤖 You are connected to Chatkit');
      const currentRoom = await currentUser.subscribeToRoom({
        roomId: ROOM_ID,
        messageLimit: 100,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message],
            });
          },
          onUserCameOnline: () => this.forceUpdate(),
          onUserWentOffline: () => this.forceUpdate(),
          onUserJoined: () => this.forceUpdate(),
          onUserStartedTyping: user => {
            console.log(`User ${user.name} started typing`);
          },
        },
      });
      this.setState({ currentRoom });
    } catch (error) {
      console.error('error', error);
    }
  }

  onSend(text) {
    this.state.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoom.id,
    });
  }

  onChange() {
    this.state.currentUser.isTypingIn({ roomId: this.state.currentRoom.id });
  }

  render() {
    return (
      <div className="wrapper">
        <div>
          <OnlineList
            currentUser={this.state.currentUser}
            users={this.state.currentRoom.users}
          />
        </div>
        <div className="chat">
          <MessageList messages={this.state.messages} />
          <SendMessageForm onSend={this.onSend} onChange={this.onChange} />
        </div>
      </div>
    );
  }
}

Chat.propTypes = {
  currentId: PropTypes.string,
};
