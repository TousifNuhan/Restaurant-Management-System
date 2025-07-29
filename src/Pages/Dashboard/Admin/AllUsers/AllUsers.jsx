import React from 'react';
import SelectedTitle from '../../../Shared/SelectedTitle/SelectedTitle';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()

    const { data: users = []
        , refetch } = useQuery({
            queryFn: async () => {
            const { data } = await axiosSecure.get('/users')
                return data
            },
            queryKey: ['users']
        })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an admin from now on`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })
    }

    const handleDeleteUser = id => {
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
                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div>
                <SelectedTitle
                    subHeading="How many??"
                    heading="MANAGE ALL USERS"
                ></SelectedTitle>
            </div>
            <div>
                <h3 className='w-11/12 mx-auto uppercase font-bold pl-3 mb-3'>Total Users: {users.length}</h3>
                <div className=' w-11/12 mx-auto'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* row 1 */}
                                {
                                    users.map((user, index) =>
                                        <tr key={user._id}>
                                            <th>{index + 1}</th>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className='btn bg-[#D1A054]'> <FaUsers className='text-white' /></button>}
                                            </td>
                                            <td>
                                                <button onClick={() => handleDeleteUser(user._id)} className='btn'> <FaTrashAlt className='text-red-600' /></button>
                                            </td>
                                        </tr>
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;