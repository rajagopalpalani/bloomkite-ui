import React from 'react';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import FontIcon from '../common/fontAwesomeIcon';
// import FAClose from 'react-icons/lib/fa/close'
// import FAUserPlus from 'react-icons/lib/fa/user-plus'
// import MdEllipsisMenu from 'react-icons/lib/md/keyboard-control'


export default function({name, numberOfUsers, onCloseChatBox}) {
	
	return (
		<div className="chat-header">
			<div className="user-info">
				<div className="user-name">{name}</div>
				<div className="status">
					<div className="indicator"></div>
					<span>{numberOfUsers ? numberOfUsers : null}</span>
				</div>
			</div>
			<div className="options">
				<span>
				{/* <i onClick={onCloseChatBox} className="fa fa-close chatbox-close-icon"></i> */}
				<FontIcon icon={faTimes} className={'chatbox-close-icon'} onClick={onCloseChatBox}/>
				</span>
				
			</div>
		</div>
	);
	
}
