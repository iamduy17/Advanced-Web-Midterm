import React from "react";
import io from "socket.io-client";
import { API_URL } from "../config";

export const socket = io(API_URL, { transports: ["websocket"] });
export const SocketContext = React.createContext();
