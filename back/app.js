require('dotenv').config()
const Message = require('./models/message');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwt = require('jsonwebtoken');


// -----------------------------------------------------------------------
const server = require('http').Server(app)
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.FRONT_ENDPOINT,
    methods: ["GET", "POST"],
  },
});

// Socket connection
io.on('connection', (socket) => {

  // When user is connected to socket
  jwt.verify(socket.handshake.auth.token, process.env.JWT_SECRET, function (err, decoded) {
    socket.id = decoded._id
    console.log(`[+] ${socket.id} from ${socket.handshake.auth.conv_id}`)

    // Join conv
    socket.join(socket.handshake.auth.conv_id)

    // Return all messages of the targeted conv
    Message.find({ "conv_id": socket.handshake.auth.conv_id }).lean().exec(function (error, records) {
      socket.emit("user_id", socket.id);
      socket.emit("all_messages", records);
    })
  });

  // When user send a new message
  socket.on("send_message", (content) => {
    let msg = new Message({
      conv_id: socket.handshake.auth.conv_id,
      content: content,
      created_by: socket.id,
    });
    msg.save();

    socket.broadcast.emit("new_message", msg)
    //io.to(socket.handshake.auth.conv_id).emit("new_message", msg);
  });

  // When user disconnect from socket
  socket.on("disconnect", () => {
    console.log(`[-] ${socket.id} from ${socket.handshake.auth.conv_id}`)
  });
})

// on change app par server
server.listen(3002, function () {
  console.log('Votre app est disponible sur localhost:3002 !')
})

// -----------------------------------------------------------------------

var app = express();
app.all('/*', function (req, res, next) {
  res.header("Content-Type", "application/json");
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  if (req.method == "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

var indexRouter = require('./routes/index');
var convsRouter = require('./routes/convs');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/convs', convsRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err)
  console.log(err);
});

module.exports = app;
