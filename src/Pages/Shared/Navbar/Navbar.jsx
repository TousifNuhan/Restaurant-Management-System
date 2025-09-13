import React from 'react';
import logo from '../../../assets/logo.png'
import { NavLink } from 'react-router-dom';
import UseAuth from '../../../hooks/UseAuth';
import { IoCart } from "react-icons/io5";
import UseCart from '../../../hooks/UseCart';
import UseAdmin from '../../../hooks/UseAdmin';

const Navbar = () => {

    const { user, logOut } = UseAuth()
    const [isAdmin]=UseAdmin()
    const [cart]=UseCart()

    const handleLogOut = () => {
        logOut()
            .then(result => {
                // console.log(result.user)
            })
            .catch(error => {
                console.error(error)
            })
    }

    const navLinks =
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/menu'>Menu</NavLink></li>
            <li><NavLink to='/order'>Order</NavLink></li>
            {
                user && isAdmin && <li><NavLink to='/dashboard/adminHome'>Dashboard</NavLink></li>
            }
            {
                user && !isAdmin && <li><NavLink to='/dashboard/cart'>Dashboard</NavLink></li>
            }
            {/* {
                user && !isAdmin && <li><NavLink to='/dashboard/userHome'>Dashboard</NavLink></li>
            } */}
           
        </>

    const navLinks2 =
        <>
            <NavLink className='btn btn-outline mr-2' to='/login'>Sign In</NavLink>
            <NavLink className='btn btn-outline' to='/register'>Sign Up</NavLink>
        </>

    const navLinks3 =
        <>
            <li className='btn btn-outline mr-2'><NavLink onClick={handleLogOut}>Logout</NavLink></li>

        </>

    return (
        <div className=''>
            <div className="navbar bg-[#000000bf] text-white z-10 fixed shadow-sm">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            {
                                navLinks
                            }
                        </ul>
                    </div>
                    <div className='flex items-center justify-center '>
                        <img src={logo} className='h-7 ' alt="" />
                        <a className="ml-1 font-semibold text-lg pt-2">Central Park BD</a>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? navLinks3 : navLinks2
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;