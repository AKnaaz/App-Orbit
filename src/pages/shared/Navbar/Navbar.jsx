import React, { use } from 'react';
import { NavLink } from 'react-router';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import Logo from '../Logo/Logo';

const Navbar = () => {
    const { user, logOut } = use(AuthContext);

    const navItems = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
            <li><NavLink to="/about">About Us</NavLink></li>
        </>
    );

    const handleLogout = () => {
        logOut()
        .then(res => console.log(res))
        .catch(error => console.log(error));
    };

    return (
        <div className="navbar shadow-sm bg-[#FF8000] md:px-16">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#FF8000] rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <Logo></Logo>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>

            <div className="navbar-end gap-2">
                {
                    user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL || "https://i.ibb.co/6J8RHpm/user.png"} alt="Profile" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#FF8000] rounded-box w-52">
                                <li><span className="font-bold">{user.displayName || 'User'}</span></li>
                                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <button className="btn btn-outline rounded-3xl font-bold">Login</button>
                            </NavLink>
                            <NavLink to="/register">
                                <button className="btn btn-outline rounded-3xl font-bold">Register</button>
                            </NavLink>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
