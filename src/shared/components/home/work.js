import React from 'react';
import { homeStaticMessage } from '../../constants/homeStatic';


const Work = (props) => {
    return (
        <section className="bk-home-work border-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-5 col-sm-12">
                        <div className="work-image">
                            <img src="/images/banner2.jpeg" alt="banner" />
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-7 col-sm-12 works">
                        <div className="text-center work-item">
                            <p>{homeStaticMessage.financialDecisions}</p>
                        </div>
                        <div className="text-center work-item">
                            <p>{homeStaticMessage.rightFinancialDecision}</p>
                        </div>
                        <div className="text-center work-item">
                            <p>{homeStaticMessage.managingMoneyArt}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Work;
