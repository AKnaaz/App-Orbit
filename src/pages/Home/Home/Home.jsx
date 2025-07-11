import React from 'react';
import Banner from '../Banner/Banner';
import TopDevelopers from '../../../components/TopDevelopers';
import CommunityTestimonials from '../../../components/CommunityTestimonials';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <FeaturedProducts></FeaturedProducts>
           <TopDevelopers></TopDevelopers>
           <CommunityTestimonials></CommunityTestimonials>
        </div>
    );
};

export default Home;