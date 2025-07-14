import React, { useEffect } from 'react';
import cx from 'classnames';
import CustomFragment from './customFragment';

const Modal = (props) => {
    const { show, onClose, title, body, footer } = props;
    const modalStyle = cx('modal fade', { show, 'd-block': show });
    useEffect(() => {
        if (show) { document.body.classList.add('modal-open') }
        else { document.body.classList.remove('modal-open') }
    }, [show]);
    return (
        <CustomFragment>
            <div className={modalStyle} id="myModal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">{title}</h4>
                            <button type="button" className="close" onClick={onClose}>&times;</button>
                        </div>
                        {body && <div className="modal-body">
                            {body}
                        </div>}
                        {footer && <div className="modal-footer">
                            {footer}
                        </div>}
                    </div>
                </div>
            </div>
            {show && <div className="modal-backdrop fade show" />}
        </CustomFragment>
    );
};

export default Modal;
