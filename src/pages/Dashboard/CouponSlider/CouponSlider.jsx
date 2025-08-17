import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Slider from 'react-slick';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import cardImg from '../../../assets/card2.jpeg'

const CouponSlider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: coupons = [] } = useQuery({
    queryKey: ['valid-coupons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/coupons');
      return res.data.filter(coupon => new Date(coupon.expiry) > new Date());
    },
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="py-12 px-4 md:px-16">
  <h2 className="text-3xl font-bold mb-4 text-center">Exclusive Coupons</h2>
  <Slider {...settings}>
    {coupons.map(coupon => (
      <div key={coupon._id} className="flex justify-center">
        <div className="p-20 w-full sm:w-2/3 md:w-1/2 mx-auto"> 
          <div className="rounded-xl shadow-lg p-10 relative overflow-hidden"
            style={{
                backgroundImage: `url(${cardImg})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
              }}
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-20 z-0" />
            <div className="relative z-10">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <h3 className="text-3xl font-extrabold text-white">{coupon.discount}% OFF</h3>
                  <p className="text-gray-300 text-sm mt-1">{coupon.description}</p>
                </div>
                <div className="text-right">
                  <h4 className="text-xl font-bold text-gray-800">DISCOUNT VOUCHER</h4>
                  <p className="text-xs text-black mt-1">Use Code: <span className="font-mono bg-gray-200 px-2 py-1 rounded">{coupon.code}</span></p>
                  <p className="text-xs mt-1 text-red-500">Expires: {new Date(coupon.expiry).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>

  );
};

export default CouponSlider;
