import React, { Component } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAdvisor, fetchAllChats, fetchAllChatRequest, approveChat, blockChat } from './Chat.actions';
import { debounce } from '../../utils/functions';
import ChatContainer from './chatContainer';
import { ChatContext } from './Chat.context';
import FontIcon from '../common/fontAwesomeIcon';
import { faTimes, faUserPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const TYPE = {
    CHATLIST: 0,
    CHAT: 1,
    REQUEST: 2
};
class ChatWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeChat: null,
            type: TYPE.CHATLIST,
            onlineList: []
        };
    }

    static contextType = ChatContext;

    componentDidMount() {
        const bloomkiteUsername = window.localStorage.getItem('bloomkiteUsername');
        if (bloomkiteUsername) {
            const {
                loggedInUser: { userName }
            } = this.props;
            let { roleBasedId } = JSON.parse(bloomkiteUsername);
            this.props.getAdvisor({ advId: roleBasedId });
            this.addEventListerners();
            this.props.fetchAllChatRequest({
                userId: roleBasedId,
                statusId: 1
            });
            if (userName) {
                const obj = { advId: roleBasedId, statusId: 1 };
                this.props.fetchAllChats(obj);
            }
        }
    }

    componentDidUpdate(prevProps) {
        const {
            loggedInUser: { advId }
        } = this.props;
        const {
            loggedInUser: { advId: prevAdvId }
        } = prevProps;
        if (advId && advId !== prevAdvId) {
            const obj = { advId, statusId: 1 };
            this.props.fetchAllChats(obj);
        }
    }

    addEventListerners = () => {
        this.context.socket.on('ROOM_CREATED', this.handleCreateRoom);
        this.context.socket.on('RECEIVE_MESSAGE', this.handleReceiveMessage);
        this.context.socket.on('ENABLE_TYPING', this.handleTyping);
        this.context.socket.on('DISABLE_TYPING', this.handleDisableTyping);
        this.context.socket.on('RECEIVE_CONTACT_LIST', this.getContactList);
        this.context.socket.emit('GET_CONTACT_LIST');
    };

    getContactList = (users) => {
        this.setState({ onlineList: { ...users } });
    };

    handleCreateRoom = (data) => {
        this.setState({ activeChat: data, type: TYPE.CHAT });
    };

    handleReceiveMessage = (message) => {
        const { activeChat } = this.state;
        const data = {
            ...activeChat,
            messages: [...activeChat.messages, message]
        };
        this.setState({ activeChat: data });
    };

    handleSendMessage = (data) => {
        this.context.socket.emit('SEND_MESSAGE', data);
        this.handleDisableTyping();
    };

    handleTyping = (user) => {
        const { loggedInUser } = this.props;
        const { advId } = loggedInUser || {};
        this.setState({ typing: advId !== user.id });
    };

    handleDisableTyping = () => {
        this.setState({ typing: false });
    };

    handleChange = () => {
        const { loggedInUser } = this.props;
        const { activeChat } = this.state;
        const { name, advId } = loggedInUser || {};
        const { roomId } = activeChat || {};
        const fn = debounce(() => this.context.socket.emit('TYPING', { roomId, name, id: advId }), 500);
        fn();
    };

    openChat = (user) => {
        const { loggedInUser } = this.props;
        const { name, advId } = loggedInUser || {};
        const { online } = user || {};
        if (online) {
            this.context.socket.emit('CREATE_NEW_CHAT', {
                receiver: { ...user, id: user.userId },
                sender: { name, id: advId }
            });
            this.setState({
                selectedUser: user
            });
        }
    };

    handleToggleChat = () => {
        const { toggleChat } = this.state;
        this.setState({
            toggleChat: !toggleChat
        });
    };

    generateChats = (users, followingChat) => {
        const { onlineList } = this.state;
        return users
            ? users.map((item) => {
                  return {
                      ...item,
                      online: !!onlineList[item.userId]
                  };
              })
            : [];
    };

    backHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            type: TYPE.CHATLIST
        });
    };

    approveHandler = (user) => {
        const { loggedInUser } = this.props;
        const { advId } = loggedInUser || {};
        this.props.approveChat({
            advId,
            status: 1,
            userId: user.userId
        });
    };

    blockHandler = (user) => {
        const { loggedInUser } = this.props;
        const { advId } = loggedInUser || {};
        this.props.blockChat({
            advId,
            status: 1,
            userId: user.userId
        });
    };

    handleRequests = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { loggedInUser } = this.props;
        const { advId } = loggedInUser || {};
        this.setState({ type: TYPE.REQUEST });
        this.props.fetchAllChats({
            advId: advId,
            statusId: 2
        });
    };

    render() {
        const { activeChat, type, toggleChat, selectedUser, typing } = this.state;
        const { loggedInUser, requests, chats, loading, onClose, followingChat } = this.props;
        const requestsList = (requests || []).filter((item) => item.status === 2);
        const chatsList = (chats || []).filter((item) => item.status === 1);
        const followingChatList = (followingChat || []).filter((item) => item.status === 1);
        const openChatBarClass = cx('chat-bar', { 'close-chat-bar': toggleChat });
        const headerClass = cx({ 'ml-5': type === TYPE.CHAT });
        const chatList = this.generateChats(chatsList);
        return (
            <div style={{ zIndex: 1 }}>
                <div className={openChatBarClass}>
                    <div className="heading" onClick={this.handleToggleChat}>
                        {type !== TYPE.CHATLIST && (
                            <div className="back-button" onClick={this.backHandler}>
                                <FontIcon icon={faArrowLeft} /> 
                            </div>
                        )}
                        <h5 className={headerClass}>{type !== TYPE.REQUEST ? 'Chat' : 'Request'}</h5>
                        <div className="menu">
                            {type === TYPE.CHATLIST && (
                                <a href="/" onClick={this.handleRequests} className="request-btn">
                                    <FontIcon icon={faUserPlus} /> 
                                </a>
                            )}
                            <FontIcon icon={faTimes} className={'chat-close'} onClick={onClose}/>
                        </div>
                    </div>
                    <ChatContainer
                        loading={loading}
                        type={type}
                        chats={chatList}
                        onUserClick={this.openChat}
                        currentUser={loggedInUser}
                        selectedUser={selectedUser}
                        chat={activeChat}
                        onSend={this.handleSendMessage}
                        onChange={this.handleChange}
                        activeChat={activeChat}
                        typing={typing}
                        requests={requestsList}
                        onApprove={this.approveHandler}
                        onReject={this.blockHandler}
                        followingChatList={followingChatList}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { chatReducer } = state;
    const { loggedInUser, followers, chats, followings, loading, requests, followingChat } = chatReducer;
    return {
        loggedInUser,
        // followers,
        // followings,
        loading,
        requests,
        chats,
        followingChat
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAdvisor: bindActionCreators(fetchAdvisor, dispatch),
        // getFollowers: bindActionCreators(fetchAllFollowers, dispatch),
        // getFollowings: bindActionCreators(fetchAllFollowings, dispatch),
        // initiateChat: bindActionCreators(createChat, dispatch),
        fetchAllChatRequest: bindActionCreators(fetchAllChatRequest, dispatch),
        approveChat: bindActionCreators(approveChat, dispatch),
        blockChat: bindActionCreators(blockChat, dispatch),
        fetchAllChats: bindActionCreators(fetchAllChats, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatWrapper);
