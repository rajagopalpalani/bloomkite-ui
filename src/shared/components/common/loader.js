import React from 'react';
import Loader from 'react-loader-spinner';

const AppLoader = (props) => {
    const { loading } = props;
    return (
        <div className="modal" className={loading ? 'modal show displayBlock' : 'displayHide'}>
            <div className="modal-dialog modal-loading">
                <div className="">
                    <Loader type="Bars" color="#FFF" />
                </div>
            </div>
        </div>
    );
};

export default AppLoader;
