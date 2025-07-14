import io from 'socket.io-client';

const socketUrl = 'http://localhost:3235';
class SocketRef {
    constructor() {
        this.socket = null;
        //this.connect();
    }

    connect = () => {
        this.socket = io(socketUrl);
        this.socket.on('connect', () => {
            console.log('connected with socket');
        });
    };

    getSocket = () => {
        return this.socket;
    };

    createUser = (data) => {
        this.socket.emit('CREATE_USER', data);
    };

    deleteUser = (data) => {
        this.socket.emit('DELETE_USER', data);
    };
}

export default SocketRef;
