import React from 'react';
import Banner from '../../components/home/banner';
import BannerTwo from '../../components/home/bannerTwo';
import BannerThree from '../../components/home/bannerThree';
import BannerFour from '../../components/home/bannerFour';

const Home = () => {
    return (
        <div className="main-container home-container">
            <div className="nopadding home-page">
                <Banner />
                <BannerTwo />
                <BannerThree />
                <BannerFour />
            </div>
        </div>
    );
};

export default Home;
