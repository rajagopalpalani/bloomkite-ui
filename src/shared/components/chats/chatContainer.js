import React from 'react';
import Chat from './Chat';
import Followers from './Followers';
import Requests from './Requests';
import { TYPE } from '../chats';

const ChatContainer = (props) => {
    const { onUserClick, onReject, onApprove, selectedUser, currentUser, activeChat, requests, type, chats, typing, onSend, onChange, loading,followingChatList } = props;
    if (loading) {
        return (
            <div
                style={{
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%'
                }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <div style={{ zIndex: 1 }}>
            {type === TYPE.CHATLIST && <Followers users={chats} onUserClick={onUserClick} followingChatList ={followingChatList}/>}
            {type === TYPE.REQUEST && <Requests users={requests} onUserClick={onUserClick} onApprove={onApprove} onReject={onReject} />}
            {type === TYPE.CHAT && (
                <Chat currentUser={currentUser} selectedUser={selectedUser} chat={activeChat} onSend={onSend} onChange={onChange} activeChat={activeChat} typing={typing} />
            )}
        </div>
    );
};

export default ChatContainer;
