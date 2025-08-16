import React from 'react';
import Banner from '../Banner/Banner';
import TopDevelopers from '../../../components/TopDevelopers';
import CommunityTestimonials from '../../../components/CommunityTestimonials';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import TrendingProducts from '../TrendingProducts/TrendingProducts';
import CouponSlider from '../../Dashboard/CouponSlider/CouponSlider';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <FeaturedProducts></FeaturedProducts>
           <TrendingProducts></TrendingProducts>
           {/* <CouponSlider></CouponSlider> */}
           {/* <TopDevelopers></TopDevelopers> */}
           {/* <CommunityTestimonials></CommunityTestimonials> */}
        </div>
    );
};

export default Home;