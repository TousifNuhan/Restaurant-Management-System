import React from 'react';
import SelectedTitle from '../../../Shared/SelectedTitle/SelectedTitle';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const EmployeeDetails = () => {

    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    const { data: empDetails = [] } = useQuery({
        queryKey: ['employeeDetails'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/addEmployee')
            return data
        }
    })

    const { mutateAsync } = useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosSecure.delete(`/addEmployee/${id}`)
            console.log(data)
            // return data
        },
        onSuccess: () => {

            queryClient.invalidateQueries(['employeeDetails'])  // refetch er boroBhai
            Swal.fire({
                title: "Deleted!",
                text: "Your employee details has been deleted.",
                icon: "success"
            });
        }
    })


    const handleDeleteEmployee = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await mutateAsync(id)
            }
        });
    }

    return (
        <div>
            <SelectedTitle
                heading="Employee Details"
                subHeading="See All!"
            >
            </SelectedTitle>

            <div className="overflow-x-auto mx-auto  ">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Phone</th>
                            <th>Salary</th>
                            <th>Shift</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            empDetails.map((empdetail, index) =>
                                <tr key={empdetail._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="h-20 w-20 rounded-md">
                                                    <img
                                                        src={empdetail.PhotoURL}
                                                        alt="Coming soon" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{empdetail.name}</div>
                                                {/* <div className="text-sm opacity-50">United States</div> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{empdetail.Department}</td>
                                    <td>
                                        {empdetail.Role}
                                    </td>
                                    <td>{empdetail.Phone}</td>
                                    <td>{empdetail.Salary}</td>
                                    <td>{empdetail.Shift}</td>
                                    <th>
                                        <Link to={`/dashboard/updateDetail/${empdetail._id}`}
                                            >
                                            <button
                                                className='btn'> <FaEdit className='text-[#D1A054] h-5 w-4' />
                                            </button>
                                        </Link>
                                    </th>

                                    <th onClick={() => handleDeleteEmployee(empdetail._id)}>
                                        <button className='btn'> <FaTrashAlt className='text-red-600' /></button>
                                    </th>

                                </tr>
                            )
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default EmployeeDetails;