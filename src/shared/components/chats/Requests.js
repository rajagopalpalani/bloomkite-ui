import React, { Component } from 'react';
import cx from 'classnames';

const Requests = (props) => {
	const { users, onApprove, onReject } = props;
	return (
		<ul className="list-group user-list">
			{users && users.map((user) => {
				const { byWhom, online ,userId} = user;
				// const status = cx('status', { online: online, offline: !online });
				return (
					<li className="list-group-item user-list-item">
						{userId}
						<div className="requestIcons">
							<button onClick={() => onApprove(user)} className="btn btn-outline-primary btn-sm mr-2" type="button">Approve</button>
							<button onClick={() => onReject(user)} className="btn btn-outline-danger btn-sm" type="button">Reject</button>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

export default Requests;

