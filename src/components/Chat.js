import React, { Component } from 'react';
import { ChatManager, TokenProvider } from '@pusher/chatkit';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import OnlineList from './OnlineList';
import TypingIndicator from './TypingIndicator';

class Chat extends Component {
        state = {
            currentUser: null,
            currentRoom: {},
            messages:[],
            usersWhoAreTyping: []
        }

        
        sendTypingEvent = () => {
            this.state.currentUser
            .isTypingIn({ roomId: this.state.currentRoom.id })
            .catch(error => console.error('error', error))
        }
    
    componentDidMount() {
        const chatkit = new ChatManager({
          instanceLocator: 'v1:us1:c2e2c214-a8b8-4ed2-b17e-ca3bd180ab07',
          userId: this.props.currentId,
          tokenProvider: new TokenProvider({
            url:
              'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/c2e2c214-a8b8-4ed2-b17e-ca3bd180ab07/token'
          })
        })

        chatkit
          .connect()
          .then(currentUser => {
            this.setState({ currentUser })
            console.log('Bleep bloop 🤖 You are connected to Chatkit')
            return currentUser.subscribeToRoom({
                roomId: 19558005,
                messageList: 100,
                hooks: {
                    onNewMessage: message => {
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    },
                    onUserCameOnline: () => this.forceUpdate(),
                    onUserWentOffline: () => this.forceUpdate(),
                    onUserJoined: () => this.forceUpdate(),
                    onUserStartedTyping: user => {
                            this.setState({
                            usersWhoAreTyping: [...this.state.usersWhoAreTyping, user.name],
                            })
                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                            usersWhoAreTyping: this.state.usersWhoAreTyping.filter(
                                username => username !== user.name
                            ),
                            })
                        },
                    }
                })
            })
            .then(currentRoom => {
                this.setState({ currentRoom })
            })
            .catch(error => console.error('error', error))
        }

      onSend = text => {
          this.state.currentUser.sendMessage({
              text,
              roomId: this.state.currentRoom.id
          })
      }

  render() {
    return (
      <main className="wrapper">
        <section>
            <OnlineList
            currentUser={this.state.currentUser}
            users={this.state.currentRoom.users}
            />
        </section>
        <section className="chat">
            <MessageList messages={this.state.messages} />
            <TypingIndicator usersWhoAreTyping={this.state.usersWhoAreTyping} />
            <SendMessageForm 
            onSend={this.onSend} 
            onChange={this.sendTypingEvent}
            />
        </section>
      </main>
    )
  }
}

export default Chat