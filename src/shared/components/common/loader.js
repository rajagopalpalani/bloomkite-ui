import React from 'react';
import { Oval } from 'react-loader-spinner';

const AppLoader = (props) => {
    const { loading } = props;
    return (
        <div className={loading ? 'modal show displayBlock' : 'displayHide'}>
            <div className="modal-dialog modal-loading">
                <div className="">
                    <Oval color="#FFF" height={40} width={40} />
                </div>
            </div>
        </div>
    );
};

export default AppLoader;
