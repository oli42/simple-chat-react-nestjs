import React from 'react';

import { io, Socket } from 'socket.io-client';
const {hostname} = document.location;

export const socket = io(`http://${hostname}:8000`);
export const SocketContext = React.createContext();