import React from 'react';
import SelectedTitle from '../../Shared/SelectedTitle/SelectedTitle';
import UseCart from '../../../hooks/UseCart';
import { FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';

const Cart = () => {

    const [cart, refetch] = UseCart()

    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    const axiosSecure = useAxiosSecure()

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.acknowledged) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch()
                        }
                    })


            }
        });
    }

    return (
        <div className=''>
            <div className=''>
                <SelectedTitle
                    subHeading="My Cart"
                    heading="WANNA ADD MORE?"
                ></SelectedTitle>
            </div>
            <div className='flex justify-evenly items-center'>
                <h2 className='font-bold'>TOTAL ORDERS: {cart.length}</h2>
                <h2 className='font-bold'>TOTAL PRICE: ${totalPrice}</h2>
                {
                    cart.length ? <Link to="/dashboard/payment"><button className='btn btn-primary'>Pay</button> </Link>
                        : <button disabled className='btn btn-primary '>Pay</button>
                }

            </div>
            <div className='mt-5'>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>ITEM IMAGE</th>
                                <th>ITEM NAME</th>
                                <th>PRICE</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>

                            {/* row 1 */}
                            {
                                cart.map((item, index) =>

                                    <tr key={item._id}>
                                        <td>
                                            {index + 1}
                                            {/* <label>
                                                <input type="checkbox" className="checkbox" />
                                            </label> */}
                                        </td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.image}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td>
                                            {item.name}
                                        </td>
                                        <td>${item.price}</td>
                                        <th>
                                            <button onClick={() => handleDelete(item._id)} className='btn'> <FaTrashAlt className='text-red-600' /></button>

                                        </th>
                                    </tr>
                                )
                            }


                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cart;