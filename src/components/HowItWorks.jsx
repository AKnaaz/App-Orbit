import React from "react";
import { motion } from "framer-motion";
import { Rocket, Upload, ThumbsUp } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Rocket className="w-12 h-12 text-[#FF8000]" />,
      title: "Browse Products",
      description: "Explore trending apps and tools from developers worldwide.",
    },
    {
      icon: <Upload className="w-12 h-12 text-[#FF8000]" />,
      title: "Submit Product",
      description: "Share your own innovation with the AppOrbit community.",
    },
    {
      icon: <ThumbsUp className="w-12 h-12 text-[#FF8000]" />,
      title: "Upvote & Review",
      description: "Support creators by upvoting and sharing your feedback.",
    },
  ];

  return (
    <section className="w-full px-6 sm:px-10 md:px-16 py-12">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-4">
          How <span className="text-[#FF8000]">AppOrbit</span> Works
        </h1>
        <p className="text-base">
          Just 3 simple steps to join the orbit
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="rounded-2xl shadow-lg p-8 flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p>{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
