import React, { Component } from 'react'
import { TextInput } from 'react-desktop/macOs'
import { Button } from 'react-desktop/macOs';
import Navbar from './Navbar';

class UsernameForm extends Component {
  constructor() {
    super()
    this.state = {
      username: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSubmit(this.state.username)
  }

  handleChange(e) {
    this.setState({ username: e.target.value })
  }

  render() {
    return (
      <main className="container col-12 username-form">
        <Navbar />
        <p className="welcome-message">
            Welcome to "My Messenger", 
            <br />
            create a username 
            <br />
            and start chatting away!
        </p>
        <form onSubmit={this.handleSubmit}>
          <section>
            <TextInput
              className="username-text-input"   
              label="Username:"
              placeholder="For example, @bubbagump"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </section>
          <section>
            <Button color="blue" type="submit">
              Submit
            </Button>
          </section>
        </form>
      </main>
    )
  }
}

export default UsernameForm