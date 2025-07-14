import React from 'react';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const CustomModal = (props) => {
    return (
        <Modal
            classNames={{
                modal: props.className
            }}
            styles={props.width}
            open={props.open}
            showCloseIcon={props.showCloseIcon}
            closeOnOverlayClick={props.closeOnOverlayClick}
            onClose={props.onClose}>
            {props.children}
        </Modal>
    );
};

export default CustomModal;
