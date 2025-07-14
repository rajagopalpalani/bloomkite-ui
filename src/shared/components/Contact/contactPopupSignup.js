import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CustomModal from '../common/customModal';

class ContactPopupSignup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false
        };
    }

    onOpenModal = () => {
        this.setState({ openPopup: true });
    };

    onCloseModal = () => {
        this.setState({ openPopup: false });
    };

    render() {
        return (
            <>
                <button type="button" className="btn btn-primary" onClick={this.onOpenModal}>
                    {this.props.buttonName}
                </button>
                {this.state.openPopup && (
                    <CustomModal className={'contact-popup popup-size'} open={this.state.openPopup} showCloseIcon={true} onClose={this.onCloseModal} closeOnOverlayClick={true}>
                        <div className="modal-body contact-bottom">
                            <h4 className="contact-head">If you have an account please login</h4>
                            <div>
                                <button className={`contactButtonStyle`}>
                                    <Link to="/login" className={`contactButton`}>
                                        Login
                                    </Link>
                                </button>
                                <p className="contact-or">(OR)</p>
                            </div>
                            <h4 className="contact-design">{`Don't have an account, please `}</h4>
                            <div className="dropdown show planning-title">
                                <button className={`contactButtonSignup`} role="button" id="dropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Signup
                                </button>
                                <div className="dropdown-menu contact-dropdown" aria-labelledby="dropdownMenuLink1">
                                    <div className="contact-align">
                                        <Link className="signupdropdown-item signup-design-adv" to="/signup?role=1">
                                            Advisor
                                        </Link>
                                    </div>
                                    <div className="contact-align">
                                        <Link className="signupdropdown-item signup-design-corp" to="/signup?role=3">
                                            Company
                                        </Link>
                                    </div>
                                    <div className="contact-align">
                                        <Link className="signupdropdown-item signup-design-inv" to="/signup?role=2">
                                            Investor
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CustomModal>
                )}
            </>
        );
    }
}

export default ContactPopupSignup;
