import React from 'react';
import AboutUs from './AboutUs';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import ExploreExperiance from './ExploreExperiance';
import Products from './Products';
import Reivew from './Reivew';
import Subscribe from './Subscribe';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <BusinessSummary></BusinessSummary>
            <Reivew></Reivew>
            <AboutUs></AboutUs>
            <ExploreExperiance></ExploreExperiance>
            <Subscribe></Subscribe>
        </div>
    );
};

export default Home;