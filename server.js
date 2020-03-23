const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Message = require('./models/Message');

dotenv.config({
  path: './.env'
});

connectDB();

// Route Files
const kits = require('./routes/kits');
const auth = require('./routes/auth');
const messages = require('./routes/messages');
const roles = require('./routes/roles');
const usersRoute = require('./routes/users');

//Express app init
const app = express();

//Cors
app.use(cors());

const http = require('http').createServer(app);
const io = require('socket.io')(http);

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

//Body Parser
app.use(express.json());

//Homepage Route
// app.use('/', (req, res, next) => {
//   res.send('Nothing to see here');
// });

//kits route
app.use('/kits', kits);
app.use('/auth', auth);
app.use('/messages', messages);
app.use('/roles', roles);
app.use('/users', usersRoute);

// Users Object
/*
  {
    "5efdj323h5423234bcd" : "socketId"
  }
*/
let users = {};

// Chat functionality
io.on('connection', socket => {
  console.log('Socket ID: ' + socket.id);

  socket.on('set-user-id', userId => {
    console.log('User ID: ' + userId);
    users[userId] = socket.id;

    console.log('Users object: ', users);

    io.emit('user-joined', users);
  });

  socket.on('send-message', messageData => {
    console.log('Data from send-message event: ', messageData);
    Message.create(messageData).then(res => {
      console.log('Res from the Message save: ', res);
      io.to(users[messageData.to]).emit('receive-message', messageData);
    });
  });
});

http.listen(process.env.PORT || 5000, () => console.log(`Server running.`));
