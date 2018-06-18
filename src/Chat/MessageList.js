import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ListView,
  ListViewRow,
  ListViewSection,
  Text,
} from 'react-desktop/macOs';

export default class MessageList extends Component {
  renderItem(message) {
    return (
      <ListViewRow key={message.id}>
        <Text color="#414141" size="13" bold>
          {message.sender.name}:&nbsp;
        </Text>
        <Text color="#414141" size="13">
          {message.text}
        </Text>
      </ListViewRow>
    );
  }
  render() {
    return (
      <ListView>
        <ListViewSection>
          {this.props.messages.map((message, index) =>
            this.renderItem(message)
          )}
        </ListViewSection>
      </ListView>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.array,
};
