import React from "react";
import io from 'socket.io-client';

export const socket = io("localhost:5000", { transports : ['websocket'] });
export const SocketContext = React.createContext();