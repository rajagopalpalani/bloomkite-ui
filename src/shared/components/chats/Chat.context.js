import React from 'react';
import SocketRef from './utils';

const ref = new SocketRef();
export const socket = ref.getSocket();
const createUser = ref.createUser;
const deleteUser = ref.deleteUser;
export const ChatContext = React.createContext({ socket, createUser, deleteUser });