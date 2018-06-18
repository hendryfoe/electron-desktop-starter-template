import React, { Component } from 'react';
import { TextInput, Button } from 'react-desktop/macOs';

export default class UsernameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSubmit(this.state.username);
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  render() {
    return (
      <div className="username-form">
        <form onSubmit={this.handleSubmit}>
          <div>
            <TextInput
              label="Username:"
              placeholder="For example, @bookercodes"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <Button color="blue" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
