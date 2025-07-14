import React, { Component } from 'react';
import CustomModal from '../common/customModal';

const width = {
    modal: {
        width: '570px'
    }
};

class HomePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true
        };
    }

    onCloseModal = () => {
        this.setState({ isVisible: false });
    };

    render() {
        return (
            <div>
                <CustomModal styles={width} open={this.state.isVisible} showCloseIcon={false} closeOnOverlayClick={false}>
                    <div className="modal-header">
                        <h4 className="heading">Welcome to Bloomkite</h4>
                    </div>
                    <div className="static-content-popup">
                        <div className="homepage-popup">Hi. Thanks for visiting our website...</div>
                        <div className="homepage-popup">
                            We are an online financial advisor portal currently onboarding our financial advisors for servicing prospective investors online.{' '}
                        </div>
                        <div className="homepage-popup">If you are a financial advisor we request you to create your profile.</div>
                        <div className="homepage-popup">If you are a financial consumer we request you to give us some time to reach you. Thank You.</div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.onCloseModal}>
                            Close
                        </button>
                    </div>
                </CustomModal>
            </div>
        );
    }
}
export default HomePopup;
