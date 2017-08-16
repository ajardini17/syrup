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
    this.socket.on('promptVideoChat', (user) => {
      if (confirm('Do you want to video chat?')) {
        this.socket.emit('agreeVideoChat', user)
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
          <Link to={{ pathname: '/videoChat', query: { firstname: this.props.firstname } }}><button>Video Chat!</button></Link>
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
