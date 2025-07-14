import React, { Component } from 'react';

// import MainHeader from '../../components/mainHeader';
import Loader from '../../components/common/loader';
import { homeMessage } from '../../constants/homeConstant';
import classNames from 'classnames';
import Footer from '../../components/home/footer';

class WhyUs extends Component {
    render() {
        return (
            <div>
                {/* <MainHeader /> */}
                <div className="container how-it-deisgns main-container pt-1">
                <h1 className="heading">{homeMessage.whyusHeader}</h1>
                    <div className="overview-size-adv">
                        <div>
                            {
                                <div className="static-content">
                                    <p>{homeMessage.whyus1}</p>
                                    <p>{homeMessage.whyus2}</p>
                                    <p>{homeMessage.whyus3}</p>
                                    <p>{homeMessage.whyus4}</p>
                                    <p>{homeMessage.whyus5}</p>
                                    <div className="whyus-content">
                                        <div className="whyus-content1">{homeMessage.whyus6}</div>
                                        <div className="whyus-content1">{homeMessage.whyus7}</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WhyUs;
