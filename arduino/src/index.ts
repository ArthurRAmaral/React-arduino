import { Board, Led } from 'johnny-five';
import axios from 'axios';
import io from 'socket.io-client';

const baseURL = 'http://192.168.0.110:3333';

const server = axios.create({
  baseURL,
});

const socket = io.connect(baseURL);

const board = new Board();

board.on('ready', function () {
  console.log('Ready!');
  const led = new Led(13);

  server
    .get('status')
    .then(({ data }) => {
      data ? led.on() : led.off();
      console.log(`Led start ${data ? 'on' : 'off'}`);
    })
    .catch((err) => console.log('server erro'));

  socket.on('led', (status: boolean) => {
    console.log(`${status ? 'on' : 'off'}`);
    status ? led.on() : led.off();
  });
});

socket.connect();
