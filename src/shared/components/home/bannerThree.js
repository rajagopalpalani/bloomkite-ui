import React from 'react';

const BannerThree = () => {
    return (
        <div className="banner3-background">
            <div className="container banner3-inner">
                <h1 className="banner3-heading">Relax! Bloomkite helps your all </h1>
                <h1 className="banner3-heading1"> Finance doubts</h1>
                <div className="banner-box">
                    <img className="ban3-image" src="/images/home_eclipse1.png" alt="banner" />
                    <h2 className="ban3-h2">Easy to use</h2>
                    <p className="ban3-para">Sign In, Set your goals, Starting building your wealth management</p>
                </div>
                <div className="banner-box">
                    <img className="ban3-image" src="/images/home_eclipse2.png" alt="banner" />
                    <h2 className="ban3-h2">Find clarity</h2>
                    <p className="ban3-para">Compare what is right in the market, get advise from our expert advisors</p>
                </div>
                <div className="banner-box">
                    <img className="ban3-image" src="/images/home_eclipse3.png" alt="banner" />
                    <h2 className="ban3-h2">Stay up to date</h2>
                    <p className="ban3-para">Plan and invest in real time. Bloomkite plan updates instantly</p>
                </div>
            </div>
        </div>
    );
};

export default BannerThree;
