/* eslint-disable react/no-string-refs */
import React, { Component } from 'react';
import classNames from 'classnames';
// import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
// import FAMenu from 'react-icons/lib/fa/list-ul'
// import FASearch from 'react-icons/lib/fa/search'
// import MdEject from 'react-icons/lib/md/eject'

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reciever: ''
        };
    }
    // handleSubmit = (e) => {
    // 	e.preventDefault()
    // 	const { reciever } = this.state
    // 	console.log(":::::reciever", reciever)
    // 	const { onSendPrivateMessage } = this.props

    // 	onSendPrivateMessage(reciever)
    // }

    // searchChatUser = (e) => {

    // 	this.setState({ reciever: e.target.value })
    // }

    render() {
        const { chats = [], activeChat, user = {}, setActiveChat, logout = () => {} } = this.props;
        // const chats = [{"id":"5d1a6b88-a7ae-4638-9855-91ab0360c777","name":"Community","messages":[],"users":[],"typingUsers":[]},{"id":"9b067bbb-941f-456e-9599-e95385706da2","name":"C&B","messages":[],"users":["C","B"],"typingUsers":[]},{"id":"2a6d2b48-5a77-4fc0-822f-29d84ee8630d","name":"C&A","messages":[{"id":"c173eb77-7ee4-41fa-a020-cd3b9d67a689","time":"21:50","message":"Hi A","sender":"C"}],"users":["C","A"],"typingUsers":[]}]
        const { reciever } = this.state;
        return (
            <div id="side-bar">
                <div className="heading">
                    <h5>
                        Chat
                        {/* <FAChevronDown /> */}
                    </h5>
                    <div className="menu">{/* <FAMenu /> */}</div>
                </div>
                {/* <form onSubmit={this.handleSubmit} className="search">
					<i className="search-icon"><FASearch /></i>
					<input
						placeholder="Search"
						type="text"
						value={reciever}
						onChange={(e) => this.searchChatUser(e)} />
					<div className="plus"></div>
				</form> */}
                <div
                    className="users"
                    ref="users"
                    onClick={(e) => {
                        e.target === this.refs.user && setActiveChat(null);
                    }}>
                    {chats.map((chat) => {
                        if (chat.name) {
                            const lastMessage = chat.messages[chat.messages.length - 1];
                            const chatSideName =
                                chat.users.find((name) => {
                                    return name !== user.name;
                                }) || 'Group Chat';

                            return (
                                <div>
                                    {/* {(chatSideName != "Group Chat")  && */}
                                    <div
                                        key={chat.id}
                                        className={classNames('user', { active: activeChat && activeChat.id === chat.id })}
                                        onClick={() => {
                                            setActiveChat(chat);
                                        }}>
                                        <div className="user-photo">{chatSideName[0].toUpperCase()}</div>
                                        <div className="user-info">
                                            <div className="name">{chatSideName}</div>
                                            {lastMessage && <div className="last-message">{lastMessage.message}</div>}
                                        </div>
                                    </div>
                                    {/* } */}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
                {/* <div className="current-user">
					<span>{user&&user.name}</span>
					<div onClick={() => { logout() }} title="Logout" className="logout">
					
					</div>
				</div> */}
            </div>
        );
    }
}
