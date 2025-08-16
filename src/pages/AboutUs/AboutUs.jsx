import React from "react";

const AboutUs = () => {
  return (
    <section className="w-full px-6 sm:px-10 md:px-20 py-16">
      <div className="text-center">
        
        <h1 className="text-4xl font-bold mb-6">About <span className="text-[#FF8000]">AppOrbit</span></h1>
        <p className="text-lg mb-12">
          Welcome to <strong>AppOrbit</strong> — a platform built for tech enthusiasts, developers, and innovators to 
          share their products, discover trending apps, and connect with a vibrant community. 
          We believe in empowering creators and helping users find tools that truly make an impact.
        </p>
      </div>

     
      <div className="grid md:grid-cols-2 gap-10">
        <div className="p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            To create a space where innovators can showcase their work, 
            receive recognition, and grow through genuine feedback and community support. 
            We aim to bridge the gap between product creators and curious users.
          </p>
        </div>
        <div className="bg-base-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p>
            To be the go-to hub for discovering impactful digital products — 
            from small startups to large-scale innovations — while building 
            a trusted ecosystem of creators, moderators, and users.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-semibold text-center mb-10">What You Can Do on AppOrbit</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-2">Discover</h3>
            <p>Find trending and featured products shared by a growing tech community.</p>
          </div>
          <div className="p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-2">Share</h3>
            <p>Upload your own products, tell your story, and showcase your innovation.</p>
          </div>
          <div className="p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold mb-2">Engage</h3>
            <p>Upvote, review, and support the creators you believe in.</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold mb-4">Join the Orbit Today</h2>
        <p className="mb-6">
          Whether you’re a creator looking to showcase your product, or a user 
          excited to explore new tech, <strong>AppOrbit</strong> is your home.
        </p>
        <a href="/register" className="btn bg-[#FF8000] text-white px-6">Get Started</a>
      </div>
    </section>
  );
};

export default AboutUs;
