import React from 'react';

const Banner = () => {
    return (
        <div className="bk-home-banner d-flex flex-column flex-sm-row align-items-sm-center">
            <div className="home-banner-overlay"></div>
            <div className="container ">
                <div className="row">
                    <div className="cl--lg-12 cl--xs-12">
                        <div className="bk-banner-layout">
                            <div className="bd-lead">
                                <h1 className="banner-heading">
                                    Get Best!
                                    <br />
                                    <span className="fin-heading">Financial Experts</span>
                                </h1>
                            </div>
                            <div className="bd-image">
                                The best place to find a financial expert, Take a guidance with financial experts to grow your wealth, Keep it simple and more personal.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
