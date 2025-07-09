import React, { use } from 'react';
import { NavLink } from 'react-router';
import logo from "../../../assets/logo.webp";
import { AuthContext } from '../../../context/AuthContext/AuthContext';

const Navbar = () => {
    const { user, logOut } = use(AuthContext);

    const navItems = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/products">Products</NavLink></li>
        </>
    );

    const handleLogout = () => {
        logOut()
        .then(res => console.log(res))
        .catch(error => console.log(error));
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow text-purple-500">
                        {navItems}
                    </ul>
                </div>
                <NavLink to="/">
                    <div className="flex items-center gap-1">
                        <img className="w-8 rounded-full" src={logo} alt="Logo" />
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
                {
                    user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img src={user.photoURL || "https://i.ibb.co/6J8RHpm/user.png"} alt="Profile" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li><span className="font-bold text-purple-700">{user.displayName || 'User'}</span></li>
                                <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                                <li><button onClick={handleLogout}>Logout</button></li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <NavLink to="/login">
                                <button className="btn btn-outline text-purple-500 rounded-3xl hover:bg-purple-500 hover:text-black">Login</button>
                            </NavLink>
                            <NavLink to="/register">
                                <button className="btn btn-outline text-purple-500 rounded-3xl hover:bg-purple-500 hover:text-black">Register</button>
                            </NavLink>
                        </>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
