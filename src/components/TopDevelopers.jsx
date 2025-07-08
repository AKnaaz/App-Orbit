import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion";

const developers = [
  {
    name: "Sarah Rose",
    title: "Frontend Developer",
    image: "https://i.postimg.cc/1XV2LvM8/t3.webp",
  },
  {
    name: "Ayan Chowdhury",
    title: "MERN Stack Developer",
    image: "https://i.postimg.cc/qBnzc4xd/t2.jpg",
  },
  {
    name: "Lamia Noor",
    title: "UI/UX Designer",
    image: "https://i.postimg.cc/WbNTDv98/as1.jpg",
  },
  {
    name: "Zunaid Mahmud",
    title: "Backend Developer",
    image: "https://i.postimg.cc/vmcm4sZk/t1.jpg",
  },
  {
    name: "Anika Hossain",
    title: "React Developer",
    image: "https://i.postimg.cc/jdSYxh5k/wo2.jpg",
  },
  {
    name: "Tahmid Rafi",
    title: "AI Enthusiast",
    image: "https://i.postimg.cc/T1kSLZwN/as4.jpg",
  },
  {
    name: "Arefin Rahman",
    title: "Software Engineer",
    image: "https://i.postimg.cc/PrR9ts0P/as5.jpg",
  },
];

const TopDevelopers = () => {
  return (
    <div className="py-16 px-4 md:px-10 lg:px-20 bg-gradient-to-b from-[#0B1120] via-[#1E1B4B] to-[#3B0764] text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-10">Top Developers</h2>

      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={4000}
        stopOnHover={true}
        centerMode
        centerSlidePercentage={100}
        showIndicators={false}
      >
        {developers.map((dev, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-sm mx-auto bg-[#111827] rounded-lg shadow-md p-6 flex flex-col items-center space-y-3">
              <img
                src={dev.image}
                alt={dev.name}
                className="w-[320px] h-[320px] rounded-full object-cover border-4 border-[#6366F1]"
              />
              <h3 className="text-xl font-semibold">{dev.name}</h3>
              <p className="text-sm text-gray-400">{dev.title}</p>
            </div>
          </motion.div>
        ))}
      </Carousel>
    </div>
  );
};

export default TopDevelopers;
