import React from 'react';
import {render} from 'react-dom';
import MessageEntry from './MessageEntry';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { withRouter } from 'react-router';

class MessageBox extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.socket = io('/');
    // '/' will trigger the .on('connection') event on the server side, connects everytime the component mounts
    this.socket.emit('userOnline', localStorage.firstname)
    this.socket.on('promptVideoChat', (myUser, fromUser, initId) => {
      if (confirm('Do you want to video chat?')) {
        localStorage.setItem('toUser', fromUser)
        localStorage.setItem('initId', initId)
        this.props.allProps.history.push('/videoChat')
      } else {
        alert('Chat denied');
      }
    });
  }


  render() {
    return (
      <div>
        <h3 className="msg-title">Conversation with {this.props.firstname}</h3>
        <div>
          <Link to={{ pathname: '/videoChat/#init', query: { toName: this.props.firstname, socket: this.socket } }}><button>Video Chat!</button></Link>
        </div>
        <section className="messageSection">
          {this.props.messages.map(message => {
            return <MessageEntry firstname={this.props.firstname} message={message} handleMatchClick={this.props.handleMatchClick} myname={this.props.myname}/>
          })}
        </section>
      </div>
    );
  }
};
export default withRouter(MessageBox);
