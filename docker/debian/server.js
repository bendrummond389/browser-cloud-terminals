const express = require('express');
const { Server } = require('ws');
const http = require('http');
const pty = require('node-pty');

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

app.get('/', function (req, res) {
  res.send("hello from the root")
});

app.get('/debian', function (req, res) {
  res.send("hello from debian")
});

wss.on('connection', function (ws) {
  let shell = pty.spawn('bash', [], {
    name: 'xterm-color',
    cols: 80,
    rows: 30
  });

  shell.on('data', function (data) {
    ws.send(data);
  });

  ws.on('message', function (msg) {
    shell.write(msg);
  });

  ws.on('close', function () {
    shell.kill();
  });
});

server.listen(8080);
