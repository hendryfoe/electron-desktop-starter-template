import React, { Component } from 'react';

import UsernameForm from './Auth/UsernameForm';
import Chat from './Chat/Chat';

const screenPages = {
  usernameForm: 'usernameForm',
  chat: 'chat',
};

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      currentUsername: null,
      currentId: null,
      currentScreen: screenPages.usernameForm,
    };

    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }

  async onUsernameSubmitted(username) {
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      const { id, name } = await response.json();

      this.setState({
        currentId: id,
        currentUsername: name,
        currentScreen: screenPages.chat,
      });
    } catch (error) {
      console.log('Error ', error);
    }
  }

  render() {
    switch (this.state.currentScreen) {
      case screenPages.chat:
        return <Chat currentId={this.state.currentId} />;

      default:
        return <UsernameForm handleSubmit={this.onUsernameSubmitted} />;
    }
  }
}

export default App;
