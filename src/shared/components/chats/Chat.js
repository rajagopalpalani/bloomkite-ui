import React, { Component } from 'react';
import moment from 'moment';
import FontIcon from '../common/fontAwesomeIcon';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default class Chat extends Component {
	constructor(props) {
		super(props)
		this.state = {
			toggleChat: false,
			message: '',
		}
	}

	handleChange = (e) => {
		const { target: { value } } = e;
		this.setState({
			message: value,
		});
		this.props.onChange(value);
	}

	handleSendMessage = (e) => {
		const { currentUser } = this.props;
		const { name, advId } = currentUser || {};
		const { chat } = this.props;
		const { message } = this.state;
		const { roomId } = chat || {};
		e.preventDefault();
		this.props.onSend({
			roomId,
			sender: { name, id: advId },
			message
		});
		this.setState({ message: '' });
	}

	renderReceiverbadge = () => {
		const { selectedUser } = this.props;
		const { name } = selectedUser || {};
		return (
			<div className="receiver-name-badge">
				{name ? <span>Connected with {name}</span> : <span>Not Connected</span>}
			</div>
		);
	}

	renderInput = () => {
		const { message } = this.state;
		const { typing, selectedUser } = this.props;
		const { name } = selectedUser || {};
		return (
			<div className="message-input-container">
				<form onSubmit={this.handleSendMessage}>
					{typing && <p><small>{name} is typing...</small></p>}
					<input value={message} type="text" onChange={this.handleChange} />
					<button type="submit" onClick={this.handleSendMessage}>
						{/* <i className="fa fa-paper-plane" /> */}
						<FontIcon icon={faPaperPlane} />
					</button>
				</form>
			</div>
		);
	}

	renderMessages = () => {
		const { chat, currentUser } = this.props;
		const { messages } = chat || {};
		const { advId } = currentUser || {};
		return (
			<div className="messages-container">
				<ul>
					{messages && messages.map((item, i) => {
						const { message, sender: { name, id } } = item;
						const date = moment(item.time).fromNow();
						const firtChar = name ? name[0] : '';
						const imageUrl = `https://dummyimage.com/40x40/fff/000000.png&text=${firtChar.toUpperCase()}`
						if (advId === id) {
							return (
								<li className="w100" style={{ display: 'flex' }} key={`message-${i}`}>
									<div className="avatar">
										<img className="img-circle w100" src={imageUrl} />
									</div>
									<div className="left-chat chat chat-ltr">
										<div className="message-text text-l">
											<p>{message}</p>
											<p><small>{date}</small></p>
										</div>
									</div>
								</li>
							);
						}
						return (
							<li className="w100" style={{ display: 'flex' }} key={`message-${i}`}>
								<div className="right-chat chat chat-rtl">
									<div className="message-text text-l">
										<p>{message}</p>
										<p><small>{date}</small></p>
									</div>
								</div>
								<div className="avatar">
									<img className="img-circle w100" src={imageUrl} />
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}

	render() {
		return (
			<div className="chat">
				{this.renderReceiverbadge()}
				{this.renderMessages()}
				{this.renderInput()}
			</div>
		);
	}
}
