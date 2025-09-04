import React from 'react';
import SelectedTitle from '../../../Shared/SelectedTitle/SelectedTitle';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddEmployee = () => {
    const { register, handleSubmit, reset } = useForm()
    const axiosSecure = useAxiosSecure()

    const { mutateAsync } = useMutation({
        mutationFn: async (employeeDetails) => {
            const { data } = await axiosSecure.post("/addEmployee", employeeDetails)
            return data
        },
        onSuccess: (data, variables) => {
            // console.log(data)
            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${variables.name} has been added to your cart`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    })

    const onSubmit = (data) => {
        console.log(data)

        const employeeDetails = {
            name: data?.name,
            Department: data?.Department,
            Employee_details: data?.Employee_details,
            Phone: data?.Phone,
            PhotoURL: data?.PhotoURL,
            Role: data?.Role,
            Salary: data?.Salary,
            Shift: data?.Shift,
        }

        mutateAsync(employeeDetails)

    }
    return (
        <div>
            <SelectedTitle
                subHeading="What's new?"
                heading="ADD AN EMPLOYEE"
            ></SelectedTitle>
            <div className='w-4/5 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend text-sm">Employee name*</legend>
                        <input {...register('name', { required: true })} type="text" className="input w-full " placeholder="Employee name" required/>
                    </fieldset>
                    <div className='flex items-center gap-6 my-3'>
                        {/* Department */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Department*</legend>
                            <select defaultValue="default" {...register("Department", { required: true })} className="select w-full " required>
                                <option disabled={true} value="default">Select a Department</option>
                                <option value="Management">Management</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Front of House">Front of House</option>
                                <option value="Logistics">Logistics</option>
                                <option value="Support Staff">Support Staff</option>

                            </select>
                        </fieldset>

                        {/* Role */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Role*</legend>
                            <select defaultValue="default" {...register("Role", { required: true })} className="select w-full " required>
                                <option disabled={true} value="default">Select a Role</option>
                                <option value="Restaurant Manager">Restaurant Manager</option>
                                <option value="Assistant Manager">Assistant Manager</option>
                                <option value="Head Chef">Head Chef</option>
                                <option value="Sous Chef">Sous Chef</option>
                                <option value="Kitchen Helper">Kitchen Helper</option>
                                <option value="Waiter/Waitress">Waiter/Waitress</option>
                                <option value="Cashier">Cashier</option>
                                <option value="Delivery Driver">Delivery Driver</option>
                                <option value="Cleaner">Cleaner</option>
                                <option value="Dishwasher">Dishwasher</option>
                                <option value="Maintenance Staff">Maintenance Staff</option>
                            </select>
                        </fieldset>

                    </div>

                    <div className='flex items-center gap-6 my-3'>
                        {/* Department */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Shift*</legend>
                            <select defaultValue="default" {...register("Shift", { required: true })} className="select w-full " required>
                                <option disabled={true} value="default">Select a Shift</option>
                                <option value="Morning">Morning </option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Night">Night</option>
                                <option value="Full Day">Full Day</option>

                            </select>
                        </fieldset>

                        {/* PhotoURL */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">PhotoURL*</legend>
                            <input {...register('PhotoURL', { required: true })} type="url" className="input w-full" placeholder="PhotoURL" required/>
                        </fieldset>

                    </div>

                    <div className='flex items-center gap-6 my-3'>
                        {/* Salary */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Salary*</legend>
                            <input {...register('Salary', { required: true })} type="number" className="input w-full" placeholder="Salary" required/>
                        </fieldset>

                        {/* price */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Phone*</legend>
                            <input {...register('Phone', { required: true })} type="number" className="input w-full" placeholder="Phone" required/>
                        </fieldset>

                    </div>

                    <div>
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Employee Details</legend>
                            <textarea {...register('Employee_details', { required: true })} className="textarea  h-24 w-full" placeholder="Employee Details" required></textarea>
                        </fieldset>
                    </div>

                    <button type='button' className='flex justify-center mb-10 w-full mt-6'>
                        <div className='flex items-center py-2 bg-[#835D23] justify-center gap-1 text-white  cursor-pointer px-5'>
                            <input type="submit" className='cursor-pointer w-full' />
                            {/* <FaUtensils></FaUtensils> */}
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEmployee;