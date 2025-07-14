import React, { lazy, Suspense } from 'react';
import Banner from '../../components/home/banner';
import Loader from '../../components/common/loader';
const BannerTwo = lazy(() => import('../../components/home/bannerTwo'));
const BannerThree = lazy(() => import('../../components/home/bannerThree'));
const BannerFour = lazy(() => import('../../components/home/bannerFour'));

const renderLoader = () => <Loader loading={true} />;

const Home = () => {
    return (
        <div className="main-container home-container">
            <div className="nopadding home-page">
                <Banner />
                <Suspense fallback={renderLoader()}>
                    <BannerTwo />
                    <BannerThree />
                    <BannerFour />
                </Suspense>
            </div>
        </div>
    );
};

export default Home;
