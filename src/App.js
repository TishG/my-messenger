import React, { Component } from 'react'
import UsernameForm from './components/UsernameForm';
import Chat from './components/Chat';
import MessageList from './components/MessageList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUsername: null,
      currentId: null,
      currentScreen: 'usernameForm'
    }
    this.onUsernameSubmitted = this.onUsernameSubmitted.bind(this);
  }


  onUsernameSubmitted(username) {
    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          currentId: data.id,
          currentUsername: data.name,
          currentScreen: 'chat'

        })
      })
      .catch(error => {
        console.error('error', error)
      })
  }

  render() {
    if (this.state.currentScreen === 'usernameForm') {
    return <UsernameForm handleSubmit={this.onUsernameSubmitted} />
    }
          
    if (this.state.currentScreen === 'chat') {
    return <Chat currentId={this.state.currentId} />
    }
  }
}

export default App