import React, { Component } from 'react';
import CustomModal from '../common/customModal';

const styles = {
    fontFamily: 'sans-serif',
    textAlign: 'center'
};

class PublishPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openPopup: false
        };
    }

    render() {
        return (
            <div style={styles}>
                <CustomModal open={this.props.openPopup} showCloseIcon={true} onClose={this.props.onCloseModal} closeOnOverlayClick={true}>
                    <div>
                        <h4 className="publish-popup">Click publish button after doing your changes</h4>
                        <div className="modal-body"></div>
                    </div>
                </CustomModal>
            </div>
        );
    }
}

export default PublishPopup;
