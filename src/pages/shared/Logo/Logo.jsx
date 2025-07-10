import React from 'react';
import { NavLink } from 'react-router';
import logo from '../../../assets/logo.webp'

const Logo = () => {
    return (
        <div>
            <NavLink to="/">
                <div className="flex items-center gap-1">
                    <img className="w-8 rounded-full" src={logo} alt="Logo" />
                    <span className="font text-2xl font-bold text-purple-500">AppOrbit</span>
                </div>
            </NavLink>
        </div>
    );
};

export default Logo;