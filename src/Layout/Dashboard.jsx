import React from 'react';
import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from 'react-icons/fa';
import { FaBasketShopping } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi2";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { NavLink, Outlet } from 'react-router-dom';
import UseCart from '../hooks/UseCart';
import UseAdmin from '../hooks/UseAdmin';
import { FaFileInvoice } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdPersonAddAlt1 } from "react-icons/md";



const Dashboard = () => {
    const [cart] = UseCart()
    const [isAdmin] = UseAdmin()
    
    return (
        <div className='flex'>
            <div className='w-52 min-h-screen bg-[#D1A054]'>
                <div className='ml-6 pt-3'>
                    <p className=" font-semibold text-lg pt-1 font-serif ">Central Park BD</p>
                    <p className=" font-semibold text-sm font-mono tracking-widest">Restaurant</p>
                    <ul className='mx-auto text-center font-medium w-full text-base mt-10'>
                        {
                            isAdmin ?
                                <>
                                    <li>
                                        <NavLink to='/dashboard/adminHome' className="flex items-center py-2 hover:text-white"> <FaHome className='mr-2'></FaHome>Admin Home</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/addItems' className="flex items-center py-2 hover:text-white"> <FaUtensils className='mr-2'></FaUtensils>Add Items</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/manageItems' className="flex items-center py-2 hover:text-white"> <FaList className='mr-2'></FaList>Manage Items</NavLink>
                                    </li>
                                     <li>
                                        <NavLink to='/dashboard/addEmployee' className="flex items-center py-2 hover:text-white"> <MdPersonAddAlt1 className='mr-1 h-8 w-5'></MdPersonAddAlt1>Add Employee</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/employeeDetails' className="flex items-center py-2 hover:text-white"><IoIosPeople className='mr-1 h-8 w-5'></IoIosPeople>Manage Employee</NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink to='/dashboard/manageBookings' className="flex items-center py-2 hover:text-white"> <FaBook className='mr-2'></FaBook>Manage Bookings</NavLink>
                                    </li> */}
                                    <li>
                                        <NavLink to='/dashboard/users' className="flex items-center py-2 hover:text-white"> <FaUsers className='mr-2 h-5 w-4'></FaUsers>All Users</NavLink>
                                    </li>
                                </>
                                :
                                <>
                                    {/* <li>
                                        <NavLink to='/dashboard/userHome' className="flex items-center py-2 hover:text-white"> <FaHome className='mr-2'></FaHome> User Home</NavLink>
                                    </li> */}
                                    <li>
                                        <NavLink to='/dashboard/cart' className="flex items-center py-2 hover:text-white"> <HiShoppingCart className='mr-2'></HiShoppingCart> My Cart ({cart.length}) </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/paymentHistory' className="flex items-center py-2 hover:text-white"> <BsFillCreditCard2FrontFill className='mr-2'></BsFillCreditCard2FrontFill>Payment History</NavLink>
                                    </li>
                                    {/* <li>
                                        <NavLink to='/dashboard/reservation' className="flex items-center py-2 hover:text-white"> <FaCalendar className='mr-2'></FaCalendar> Reservation</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/review' className="flex items-center py-2 hover:text-white"> <FaAd className='mr-2'></FaAd>Add Review</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/bookings' className="flex items-center py-2 hover:text-white"> <FaList className='mr-2 w-4 h-4'></FaList> My Bookings</NavLink>
                                    </li> */}
                                    
                                </>
                        }

                        <hr className='w-11/12 text-white border my-5' />

                        <li>
                            <NavLink to='/' className="flex items-center py-2 hover:text-white"> <FaHome className='mr-2'></FaHome>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to='/menu' className="flex items-center py-2 hover:text-white"> <FaSearch className='mr-2 h-4 w-4'></FaSearch>Menu</NavLink>
                        </li>
                        <li>
                            <NavLink to='/order' className="flex items-center py-2 hover:text-white"> <FaBasketShopping className='mr-2 h-4 w-4'></FaBasketShopping>Shop</NavLink>
                        </li>
                        {/* <li>
                            <NavLink to='/contact' className="flex items-center py-2 hover:text-white"> <FaEnvelope className='mr-2'></FaEnvelope>Contact</NavLink>
                        </li> */}


                    </ul>
                </div>
            </div>
            <div className='flex-1 p-5'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;