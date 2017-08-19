const express = require('express');
const parser = require('body-parser');
const morgan = require('morgan');
const db = require('../db/index.js');
const routes = require('./routes/routes.js');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const cors = require('cors');
require('dotenv').config();
require('dotenv').load();


const PORT = process.env.PORT || 8080;


app.use(parser.json());
app.use(parser.urlencoded( {extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '../static')));

app.use(cors());

app.use('/api', routes);
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static/index.html'))
});

// socket.io
server.listen(PORT, err => {
  if (err) {
    console.log(err)
  } else {
    console.log(`Successfully connected to PORT ${PORT}`)
  }
});

const users = {}

io.on('connection', socket => {
    console.log('a user connected', socket.id);
    socket.on('disconnect', () => {
      console.log('user disconnected')
    });
  socket.on('userOnline', username => {
    users[username] = socket.id;
  })
  socket.on('send message', msg => {
    console.log('message: ' + msg)
    io.sockets.emit('chat message', msg);
  })
  socket.on('promptVideoChat', (toName, myName, initId) => {
    console.log('SENDING PROMPT FROM ', myName, "TO ", toName)
    socket.broadcast.to(users[toName]).emit('promptVideoChat', toName, myName, initId)
  })
  socket.on('agreeVideoChat', (toName, returnId) => {
    socket.broadcast.to(users[toName]).emit('agreeVideoChat', toName, returnId)
    console.log('SENDING VIDEOCHAT AGREEMENT TO ', toName, users)
  })

})
