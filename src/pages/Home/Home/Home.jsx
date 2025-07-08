import React from 'react';
import Banner from '../Banner/Banner';
import TopDevelopers from '../../../components/TopDevelopers';
import CommunityTestimonials from '../../../components/CommunityTestimonials';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <TopDevelopers></TopDevelopers>
           <CommunityTestimonials></CommunityTestimonials>
        </div>
    );
};

export default Home;