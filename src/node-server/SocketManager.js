/* eslint-disable no-unused-vars */
const io = require('./index.js').io;
import { debounce } from '../../src/shared/utils/functions';

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT, TYPING, PRIVATE_MESSAGE } = require('../shared/components/events');

const { createUser, createMessage, createChat } = require('../Factories');

let connectedUsers = {};

let communityChat = createChat();

module.exports = function (socket) {
    console.log('Socket Id:' + socket.id);
    let sendMessageToChatFromUser;
    let sendTypingFromUser;

    //Verify Username
    socket.on(VERIFY_USER, (nickname, callback) => {
        // console.log(":::::::::::nickname:", nickname);
        // console.log('::::isUser', isUser(connectedUsers, nickname));
        if (isUser(connectedUsers, nickname)) {
            callback({ isUser: true, user: null });
        } else {
            callback({ isUser: false, user: createUser({ name: nickname, socketId: socket.id }) });
        }
    });

    socket.on('NEW USER', (user) => {
        console.log(':::::::::::NEW USER:', user);
        io.emit('NEW USER', user);
    });

    //User Connects with username
    socket.on(USER_CONNECTED, (user) => {
        user.socketId = socket.id;
        connectedUsers = addUser(connectedUsers, user);
        socket.user = user;

        sendMessageToChatFromUser = sendMessageToChat(user.name);
        sendTypingFromUser = sendTypingToChat(user.name);

        io.emit(USER_CONNECTED, connectedUsers);
        console.log(':::::::::::::::USER_CONNECTED::::::::', connectedUsers);
    });

    //User disconnects
    socket.on('disconnect', () => {
        if ('user' in socket) {
            connectedUsers = removeUser(connectedUsers, socket.user.name);
            io.emit(USER_DISCONNECTED, connectedUsers);
        }
    });

    //User logsout
    socket.on(LOGOUT, () => {
        // console.log('LOGOUT::::::', socket.user);
        connectedUsers = removeUser(connectedUsers, socket.user.name);
        io.emit(USER_DISCONNECTED, connectedUsers);
    });

    //Get Community Chat
    socket.on(COMMUNITY_CHAT, (callback) => {
        callback(communityChat);
    });

    socket.on(MESSAGE_SENT, ({ chatId, message }) => {
        sendMessageToChatFromUser(chatId, message);
    });

    // socket.on(TYPING, ({ chatId, isTyping }) => {
    // 	sendTypingFromUser(chatId, isTyping)
    // })

    socket.on(PRIVATE_MESSAGE, ({ receiver, sender }) => {
        console.log(receiver in connectedUsers);
        // if (receiver in connectedUsers) {
        const newChat = createChat({ name: `${receiver}&${sender}`, users: [receiver, sender] });
        const recieverSocket = connectedUsers[receiver].socketId;
        socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat);
        socket.emit(PRIVATE_MESSAGE, newChat);
        // }
    });

    socket.on('GET_CONTACT_LIST', () => {
        socket.emit('RECEIVE_CONTACT_LIST', { ...connectedUsers });
    });

    socket.on('CREATE_NEW_CHAT', ({ receiver, sender }) => {
        const _senderId = `${receiver.id}-${sender.id}`;
        const _receiverId = `${sender.id}-${receiver.id}`;
        let _roomId = _senderId;
        if (io.sockets.adapter.rooms[_receiverId]) {
            _roomId = _receiverId;
        }
        const name = `${receiver.name}-${sender.name}`;
        const users = [receiver, sender];
        const newChat = createChat({ name, users, roomId: _roomId });
        console.log(`Event: CREATE_NEW_CHAT - ${_roomId} - ${name}`);
        socket.join(_roomId);
        io.sockets.in(_roomId).emit('ROOM_CREATED', newChat);
    });

    socket.on('SEND_MESSAGE', ({ roomId, message, sender }) => {
        const msg = createMessage({ message, sender });
        console.log(`Event: SEND_MESSAGE - ${message}-${roomId}`);
        io.sockets.in(roomId).emit('RECEIVE_MESSAGE', msg);
    });

    socket.on('TYPING', ({ roomId, ...user }) => {
        console.log(`TYPING - ${roomId}`);
        io.sockets.in(roomId).emit('ENABLE_TYPING', user);
        const fn = debounce(() => io.sockets.in(roomId).emit('DISABLE_TYPING'), 500);
        fn();
    });

    socket.on('CREATE_USER', (user) => {
        const { advId } = user;
        connectedUsers = { ...connectedUsers, [advId]: user };
        socket.broadcast.emit('RECEIVE_CONTACT_LIST', { ...connectedUsers });
    });

    socket.on('DELETE_USER', (user) => {
        const { advId } = user;
        delete connectedUsers[advId];
        socket.broadcast.emit('RECEIVE_CONTACT_LIST', { ...connectedUsers });
    });

    socket.on('JOIN_ROOM', (roomId) => {
        socket.join(roomId);
    });

    socket.on('LEAVE_ROOM', (roomId) => {
        socket.leave(roomId);
    });
};
/*
 * Returns a function that will take a chat id and a boolean isTyping
 * and then emit a broadcast to the chat id that the sender is typing
 * @param sender {string} username of sender
 * @return function(chatId, message)
 */
function sendTypingToChat(user) {
    return (chatId, isTyping) => {
        io.emit(`${TYPING}-${chatId}`, { user, isTyping });
    };
}

/*
 * Returns a function that will take a chat id and message
 * and then emit a broadcast to the chat id.
 * @param sender {string} username of sender
 * @return function(chatId, message)
 */
function sendMessageToChat(sender) {
    return (chatId, message) => {
        io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({ message, sender }));
    };
}

/*
 * Adds user to list passed in.
 * @param userList {Object} Object with key value pairs of users
 * @param user {User} the user to added to the list.
 * @return userList {Object} Object with key value pairs of Users
 */
function addUser(userList, user) {
    let newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList;
}

/*
 * Removes user from the list passed in.
 * @param userList {Object} Object with key value pairs of Users
 * @param username {string} name of user to be removed
 * @return userList {Object} Object with key value pairs of Users
 */
function removeUser(userList, username) {
    let newList = Object.assign({}, userList);
    delete newList[username];
    return newList;
}

/*
 * Checks if the user is in list passed in.
 * @param userList {Object} Object with key value pairs of Users
 * @param username {String}
 * @return userList {Object} Object with key value pairs of Users
 */
function isUser(userList, username) {
    return username in userList;
}
