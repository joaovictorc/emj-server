import * as socketIo from 'socket.io';

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    io: SocketIO.Server;
    connectedUsers: {};
  }
}
