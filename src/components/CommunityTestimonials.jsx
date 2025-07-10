import React from 'react';
import Marquee from 'react-fast-marquee';
import { FaStar } from 'react-icons/fa';

const testimonialsTop = [
  {
    name: 'Amina S.',
    feedback: 'This platform helped me launch my first product. Amazing!',
    img: 'https://randomuser.me/api/portraits/women/68.jpg'
  },
  {
    name: 'Tanvir H.',
    feedback: 'I found tools I didn’t even know I needed. Super useful!',
    img: 'https://randomuser.me/api/portraits/men/52.jpg'
  },
  {
    name: 'Rafiq R.',
    feedback: 'The community support here is just awesome!',
    img: 'https://randomuser.me/api/portraits/men/64.jpg'
  },
  {
    name: 'Lamia N.',
    feedback: 'I showcased my app and got great feedback!',
    img: 'https://randomuser.me/api/portraits/women/45.jpg'
  }
];

const testimonialsBottom = [
  {
    name: 'Rashed K.',
    feedback: 'This is the ProductHunt of Bangladesh!',
    img: 'https://randomuser.me/api/portraits/men/34.jpg'
  },
  {
    name: 'Nilufa Y.',
    feedback: 'Smooth interface and awesome tools!',
    img: 'https://randomuser.me/api/portraits/women/29.jpg'
  },
  {
    name: 'Faisal A.',
    feedback: 'Highly recommend it to all devs.',
    img: 'https://randomuser.me/api/portraits/men/23.jpg'
  },
  {
    name: 'Sumaiya R.',
    feedback: 'It motivates me to build and launch.',
    img: 'https://randomuser.me/api/portraits/women/14.jpg'
  }
];

const CommunityTestimonials = () => {
  return (
    <div className="mb-5 py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-b from-[#0B1120] via-[#1E1B4B] to-[#3B0764] text-white text-center">
      <h2 className="text-3xl font-bold text-center mb-10">Community Testimonials</h2>

      {/* Top Marquee */}
      <Marquee speed={40} pauseOnHover gradient={false} className="mb-6">
        {testimonialsTop.map((t, index) => (
          <div
            key={index}
            className="mx-4 p-6 rounded-lg min-w-[270px] shadow-2xl flex flex-col items-center text-center border border-purple-800"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-purple-800"
            />
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="italic text-purple-500 mb-2">"{t.feedback}"</p>
            <h4 className="font-semibold text-purple-500">— {t.name}</h4>
          </div>
        ))}
      </Marquee>

      {/* Bottom Marquee (Right to Left) */}
      <Marquee
        speed={40}
        pauseOnHover
        gradient={false}
        direction="right"
        className="mt-6"
      >
        {testimonialsBottom.map((t, index) => (
          <div
            key={index}
            className="mx-4 p-6 rounded-lg min-w-[270px] shadow-md flex flex-col items-center text-center border border-purple-800"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-16 h-16 rounded-full object-cover mb-3 border-2 border-purple-500"
            />
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <p className="italic text-purple-500 mb-2">"{t.feedback}"</p>
            <h4 className="font-semibold text-purple-500">— {t.name}</h4>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default CommunityTestimonials;
