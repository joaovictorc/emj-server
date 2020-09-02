import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';
import socket from 'socket.io';
import http from 'http';

import AppError from '../../errors/AppError';

import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

// const app = express();
// const server = http.createServer(app);

// const io = socket().listen(server);

let connectedUsers: {} = {};

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(function (req, res, next) {
  req.io = io;
  req.connectedUsers = connectedUsers;
  next();
});
app.use(express.json());
app.use(errors());
app.use(cors());
app.use(routes);

app.use((err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', mmessage: err.message });
  }
  console.log(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

io.on('connection', (socket) => {
  const { class_id } = socket.handshake.query;

  socket.join(class_id);

  // connectedUsers[class_id] = class_id;

  socket.on('disconnect', () => {
    // delete connectedUsers[class_id];
    socket.rooms === {};
    console.log('desconectou');
  });
});

server.listen(3333, () => {
  console.log('🚀 Backend started on port 3333!');
});
