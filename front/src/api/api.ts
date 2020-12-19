import axios from 'axios';
import io from 'socket.io-client';

const API_PORT = 80;

const api = axios.create({
  baseURL: `http://192.168.0.100:${API_PORT}`,
});

export { api };