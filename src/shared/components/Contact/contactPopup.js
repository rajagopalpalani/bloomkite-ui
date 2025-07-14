import React from 'react';
import CustomModal from '../common/customModal';
import FontIcon from '../../components/common/fontAwesomeIcon';
import { faEnvelope, faPhoneAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const ContactPopup = (props) => {
    return (
        <CustomModal className={'contact-popup'} open={props.openPopup} showCloseIcon={true} onClose={props.onCloseModal} closeOnOverlayClick={true}>
            {!props.sharedContact && (
                <div>
                    {/* <h4>Contact Details</h4> */}
                    <div className="modal-body">
                        {/* <div className="contact-details">
                            <div className="mail-mobile-content2">
                                <FontIcon icon={faUser} />
                            </div>
                            {props.profile.name}
                        </div> */}
                        <div className="contact-details">
                            <a className="mail-mobile-content" href={`mailto:${props.profile.emailId}`}>
                                <div className="mail-mobile-content2">
                                    <FontIcon icon={faEnvelope} />
                                </div>
                                {props.profile.emailId}
                            </a>
                        </div>
                        <div className="contact-details">
                            <div className="mail-mobile-content1">
                                <FontIcon icon={faPhoneAlt} />
                            </div>
                            <a className="mail-mobile-content" href={`tel:+${props.profile.phoneNumber}`}>
                                {props.profile.phoneNumber}
                            </a>
                        </div>
                        {/* <div className="contact-details1">{props.profile.address1} </div>
                        <div className="contact-details1">{props.profile.website} </div> */}
                    </div>
                    {/* <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={props.onCloseModal}>
                                Close
                            </button>
                        </div> */}
                </div>
            )}
            {props.sharedContact && (
                <div>
                    {/* <h2>Contact Details</h2> */}
                    <div className="modal-body">
                        {/* <div className="contact-details">
                            <div className="mail-mobile-content2">
                                <FontIcon icon={faUser} />
                            </div>
                            {props.sharedContact[props.contactIndex].name}
                        </div> */}
                        <div className="contact-details">
                            <a className="mail-mobile-content" href={`mailto:${props.sharedContact[props.contactIndex].emailId}`}>
                                <div className="mail-mobile-content2">
                                    <FontIcon icon={faEnvelope} />
                                </div>
                                {props.sharedContact[props.contactIndex].emailId}
                            </a>
                        </div>
                        <div className="contact-details">
                            <a className="mail-mobile-content" href={`tel:+${props.sharedContact[props.contactIndex].phoneNumber}`}>
                                <div className="mail-mobile-content1">
                                    <FontIcon icon={faPhoneAlt} />
                                </div>
                                {props.sharedContact[props.contactIndex].phoneNumber}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </CustomModal>
    );
};

export default ContactPopup;
