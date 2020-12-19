import express from 'express';
import cors from 'cors';
import { Server as SocketServer } from 'socket.io';

const app = express();
app.use(cors());
app.options('*', cors());

let ledStatus = true;

app.put('/on', (request: any, response: any) => {
  ledStatus = true;
  socketIO.emit('led', true);
  return response.json(ledStatus);
});

app.put('/off', (request: any, response: any) => {
  ledStatus = false;
  socketIO.emit('led', ledStatus);
  return response.json(ledStatus);
});

app.get('/status', (request: any, response: any) => {
  return response.json(ledStatus);
});

const PORT = 3333;

const server = app.listen(PORT, function () {
  console.log(`Servidor rodando em: http://192.168.0.110:${PORT}`);
});

const socketIO = new SocketServer(server);