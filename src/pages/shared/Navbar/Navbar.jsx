import React from 'react';
import { NavLink } from 'react-router';
import logo from "../../../assets/logo.webp"

const Navbar = () => {

      const navItems = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>  
    </>


    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                </div>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-purple-500">
                    {navItems}
                </ul>
                </div>
                <NavLink to="/">
                 <div className='flex items-center gap-0'>
                    <img className='w-8 rounded-full' src={logo} alt="" />
                    <span className="font text-2xl font-bold text-purple-500">AppOrbit</span>
                 </div>
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-purple-500">
                {navItems}
                </ul>
            </div>
            <div className="navbar-end gap-2">    
            <NavLink to="/login">
                <button className="btn btn-outline text-purple-500 rounded-3xl hover:bg-purple-500 hover:text-black">Login</button>
            </NavLink>
            <NavLink to="/register">
                <button className="btn btn-outline text-purple-500 rounded-3xl hover:bg-purple-500 hover:text-black">Register</button>
            </NavLink>
            </div>
        </div>
    );
};

export default Navbar;