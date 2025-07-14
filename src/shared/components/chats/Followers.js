import React, { Component } from 'react';
import cx from 'classnames';

const Followers = (props) => {
	const { users, onUserClick, followingChatList } = props;
	const bloomkiteUsername = window.localStorage.getItem('bloomkiteUsername');
	let { partyId, roleBasedId, roleId } = JSON.parse(bloomkiteUsername);
	let userIds = [];
	return (
		<ul className="list-group user-list">
			{users &&
				users.map((user) => {
					const { online, userId, advId, name } = user;
					const status = cx('status', { online: online, offline: !online });
					userIds.push(userId);
					return (
						<li className="list-group-item user-list-item" onClick={() => onUserClick(user)}>
							{name}
							<span className={status} />
						</li>
					);
				})}
			{followingChatList &&
				followingChatList.map((user) => {
					const { online, userId, advId, name } = user;
					const status = cx('status', { online: online, offline: !online });
					let isDuplicate = userIds.includes(advId);
					if (!isDuplicate) {
						return (
							<li className="list-group-item user-list-item" onClick={() => onUserClick(user)}>
								{name}
								<span className={status} />
							</li>
						);
					}
				})}
		</ul>
	);
};

export default Followers;
