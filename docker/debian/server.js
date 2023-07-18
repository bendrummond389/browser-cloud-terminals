var app = require('express')();
var server = require('http').Server(app);

var io = require('socket.io')(server, {
  cors: {
    origin: "*",  // Allow all origins
    methods: ["GET", "POST"]
  }
});
var pty = require('node-pty');

// Define socket events
io.on('connection', function(socket){
  var shell = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30
  });

  socket.on('input', function(data){
    shell.write(data);
  });

  shell.on('data', function(data){
    socket.emit('output', data);
  });

  socket.on('disconnect', function() {
    shell.kill();
  });
});

// Define routes
// app.get('/', function (req, res) {
//   res.send('Hello World!')
// });

app.get('/', function (req, res) {
  res.send("hello from the root")
});

app.get('/debian', function (req, res) {
  res.send("hello from debian")
});

// Start the server
server.listen(8080);
