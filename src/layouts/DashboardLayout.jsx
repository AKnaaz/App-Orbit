import React from 'react';
import { CgProfile } from 'react-icons/cg';
import { MdAddBox, MdBarChart, MdInventory2, MdLocalOffer, MdOutlineRateReview, MdOutlineReportProblem, MdPeopleOutline } from 'react-icons/md';
import { NavLink, Outlet } from 'react-router';
import Logo from '../pages/shared/Logo/Logo';
import useUserRole from '../hooks/useUserRole';

const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar w-full lg:hidden">
                    <div className="flex-none ">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-6 w-6 stroke-current"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                        </label>
                    </div>
                <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                
                </div>
                {/* Page content here */}
                <Outlet></Outlet>
                {/* Page content here */}
                
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-[#FF8000] min-h-full w-80 p-4">
                {/* Sidebar content here */}
                <div className='mb-5'>
                    <Logo></Logo>
                </div>
                
                <label className="toggle text-base-content">
                    <input type="checkbox" value="dark" className="theme-controller" />
                    <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                        <circle cx="12" cy="12" r="4"></circle>
                        <path d="M12 2v2"></path>
                        <path d="M12 20v2"></path>
                        <path d="m4.93 4.93 1.41 1.41"></path>
                        <path d="m17.66 17.66 1.41 1.41"></path>
                        <path d="M2 12h2"></path>
                        <path d="M20 12h2"></path>
                        <path d="m6.34 17.66-1.41 1.41"></path>
                        <path d="m19.07 4.93-1.41 1.41"></path>
                        </g>
                    </svg>
                    <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        </g>
                    </svg>
                </label>

                {!roleLoading && role?.toLowerCase().trim() === 'user' &&
                    <>
                    <li className='font-bold mt-5'>
                    <NavLink to="/dashboard/my-profile">
                    <CgProfile className="inline" size={20}/>
                    My Profile</NavLink>
                    </li>

                    <li className='font-bold'>
                    <NavLink to="/dashboard/user-statistics">
                    <MdBarChart className="inline" size={20}/>
                    User Statistics</NavLink>
                    </li>

                    <li className='font-bold'>
                        <NavLink to="/dashboard/add-product">
                        <MdAddBox className="inline" size={20}/>
                        Add Product</NavLink>
                    </li>

                    <li className='font-bold'>
                        <NavLink to="/dashboard/my-products">
                        <MdInventory2 className="inline" size={20}/>
                        My Products</NavLink>
                    </li>
                    </>
                }
               
                {!roleLoading && role?.toLowerCase().trim() === 'moderator' &&
                    <>
                    <li className='font-bold mt-5'>
                    <NavLink to="/dashboard/moderator-profile">
                    <CgProfile className="inline" size={20}/>
                    My Profile</NavLink>
                    </li>

                    <li className="font-bold">
                    <NavLink to="/dashboard/moderator-statistics">
                        <MdBarChart className="inline" size={20} />
                        Moderator Statistics
                    </NavLink>
                    </li>

                    <li className="font-bold">
                    <NavLink to="/dashboard/product-review-queue">
                        <MdOutlineRateReview className="inline" size={20} />
                        Product Review Queue
                    </NavLink>
                    </li>

                    <li className="font-bold">
                        <NavLink to="/dashboard/reported-contents">
                            <MdOutlineReportProblem className="inline" size={20} />
                            Reported Contents
                        </NavLink>
                    </li>
                    </>
                }


               {!roleLoading && role?.toLowerCase().trim() === 'admin' &&
                <>
                <li className="font-bold mt-5">
                    <NavLink to="/dashboard/profile-page">
                        <CgProfile className="inline" size={20} />
                        My Profile
                    </NavLink>
                </li>

                <li className="font-bold">
                    <NavLink to="/dashboard/manage-users">
                        <MdPeopleOutline className="inline" size={20} />
                        Manage Users
                    </NavLink>
                </li>

                <li className="font-bold">
                    <NavLink to="/dashboard/admin-statistics">
                        <MdBarChart className="inline" size={20} />
                        Admin Statistics
                    </NavLink>
                </li>

                <li className="font-bold">
                    <NavLink to="/dashboard/manage-coupons">
                        <MdLocalOffer className="inline" size={20} />
                        Manage Coupons
                    </NavLink>
                </li>
                </>
               }


                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;