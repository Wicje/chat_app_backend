
import { Socket } from "socket.io";
import jwt from "jsonwebtoken";

export interface AuthenticatedSocket extends Socket {
  data: {
    user?: any;
  };
}

export const socketAuth = (socket: AuthenticatedSocket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth?.token;

  if (!token) {
    return next(new Error("No token provided"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    socket.data.user = decoded; // attach user payload to socket
    next();
  } catch (err) {
    next(new Error("Invalid token"));
  }
};
