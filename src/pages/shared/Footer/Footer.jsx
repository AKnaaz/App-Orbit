import React from 'react';
import { FaFacebook, FaInstagramSquare, FaLinkedin, FaTwitterSquare, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router';
import Logo from '../Logo/Logo';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer p-5 md:px-16">
        {/* Logo Section */}
        <div>
          <Logo></Logo>
         <p className="text-sm mt-2">
            Discover & Share Tech Products<br />Built with using MERN
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <span className="footer-title">Useful Links</span>
          <Link to="/" className="link link-hover">Home</Link>
          <Link to="/products" className="link link-hover">Products</Link>
          <Link to="/about" className="link link-hover">About Us</Link>
          <Link to="/contact" className="link link-hover">Contact</Link>
          <Link to="/terms" className="link link-hover">Terms & Privacy</Link>
        </div>

        {/* Social Links */}
        <div>
          <span className="footer-title">Social Links</span>
            <div className="grid grid-flow-col gap-4">
                <a href="https://www.facebook.com/anmoon.islam.31"><FaFacebook className='text-blue-400' size={25}/></a>
                <a href="https://www.instagram.com/?hl=en"><FaInstagramSquare className='text-pink-400' size={25}/></a>
                <a href="https://x.com/Moontahasafiq"><FaTwitterSquare className='text-black' size={25}/></a>
                <a href="https://www.linkedin.com/in/nazatakter-dev"><FaLinkedin className='text-blue-400' size={25}/></a>
            </div>
        </div>
      </div>


      {/* Bottom Footer */}
      <div className="footer footer-center p-4">
        <p>© {year} AppOrbit. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
