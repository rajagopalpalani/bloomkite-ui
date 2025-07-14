import React from 'react';

const BrowserOfflineNotice = (props) => {
    return (
        <div className={props.browserOffline ? 'modal show displayBlock delete-confirm' : 'displayHide'} id={props.browserOffline ? 'browseOffline' : ''}>
            <div className="modal-dialog modal-login">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">
                            <img src="images/unlink.png" /> Notice
                        </h4>
                    </div>
                    <div className="modal-body">
                        <div className="text-center">Please check your internet connection!!! Try Again</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrowserOfflineNotice;
