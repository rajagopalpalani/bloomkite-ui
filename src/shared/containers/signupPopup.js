import React, { Component } from 'react';
import CustomModal from '../components/common/customModal';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
};

class SignupPopup extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={styles}>
                <CustomModal className={'signup-popup'} open={this.props.openPopup} showCloseIcon={false} closeOnOverlayClick={false}>
                    <div>
                        <h4 className="signup-popup-heading">Welcome to Bloomkite!</h4>
                        <div className="signup-popup-body">We send the activation link to your registered email address, Please activate your account.</div>
                        <div className="signup-popup-button">
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.handleClose}>
                                OK
                            </button>
                        </div>
                    </div>
                </CustomModal>
            </div>
        );
    }
}

export default SignupPopup;
