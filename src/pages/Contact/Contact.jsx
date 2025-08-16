import React from "react";
import { FaFacebook, FaLinkedin, FaPhoneVolume, FaTwitterSquare  } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";

const Contact = () => {
  return (
    <section className="w-full px-6 sm:px-10 md:px-20 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">
          Contact <span className="text-[#FF8000]">Us</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Have questions, feedback, or partnership ideas? 
          We’d love to hear from you. Fill out the form below or 
          reach us through our contact details.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
        <div className="p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-6 text-[#FF8000]">Send us a Message</h2>
          <form className="space-y-5">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full"
                required
              ></textarea>
            </div>
            <button className="btn bg-[#FF8000] text-white w-full">Send Message</button>
          </form>
        </div>

        
        <div className="p-8 rounded-2xl shadow-md hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold mb-6 text-[#FF8000]">Get in Touch</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center gap-2">
              <IoLocationOutline size={25}/> <strong>Office:</strong> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineMail size={25}/> <strong>Email:</strong> support@apporbit.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneVolume size={25}/> <strong>Phone:</strong> +880 1234-567890
            </li>
          </ul>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/anmoon.islam.31"><FaFacebook className='text-blue-400' size={25}/></a>
              <a href="https://x.com/Moontahasafiq"><FaTwitterSquare className='text-black' size={25}/></a>
              <a href="https://www.linkedin.com/in/nazatakter-dev"><FaLinkedin className='text-blue-400' size={25}/></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
