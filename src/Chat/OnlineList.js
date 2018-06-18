import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  ListView,
  ListViewRow,
  ListViewSection,
  Text,
} from 'react-desktop/macOs';

export default class OnlineList extends Component {
  static propTypes = {
    users: PropTypes.array,
    currentUser: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  render() {
    return (
      <ListView className="online-list">
        <ListViewSection>
          {this.props.users &&
            this.props.users.map(user => {
              if (user.id === this.props.currentUser.id) {
                return this.renderItem(
                  `${user.name} (You)`,
                  user.id,
                  user.presence.state
                );
              }
              return this.renderItem(user.name, user.id, user.presence.state);
            })}
        </ListViewSection>
      </ListView>
    );
  }

  renderItem(name, id, status) {
    const itemStyle = {};

    return (
      <ListViewRow key={id}>
        <div
          className="online-list-item"
          style={{
            background: status === 'online' ? '#6BD761' : 'gray',
          }}
        />
        <Text color="#414141" size="13">
          {name}{' '}
        </Text>{' '}
      </ListViewRow>
    );
  }
}
