import React from 'react';
import {render} from 'react-dom';
import io from 'socket.io-client';
import Peer from 'simple-peer';

class VideoChat extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.socket = io('/');
    // '/' will trigger the .on('connection') event on the server side, connects everytime the component mounts
    this.socket.emit('promptVideoChat')
    this.socket.on('agreeVideoChat', body => {
      // console.log('body', body);
      // console.log('profile', this.props.profile);
      console.log('VIDEO CHAT AGREEMENT RECEIVED')
    });
  }


  render() {
    console.log('NAAAME', this.props)
    return (
      <div className='videoChatBox'>
        <h1>HELLOOOOO</h1>
      </div>
    );
  }
};
export default VideoChat;
