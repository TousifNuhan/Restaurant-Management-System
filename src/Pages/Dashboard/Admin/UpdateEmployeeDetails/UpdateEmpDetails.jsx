import React, { useEffect } from 'react';
import SelectedTitle from '../../../Shared/SelectedTitle/SelectedTitle';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const UpdateEmpDetails = () => {

    const queryClient = useQueryClient()
    const axiosSecure = useAxiosSecure()
    // const employee=useLoaderData()
    // console.log(employee)
    const { _id, name, Department, Employee_details, Phone, PhotoURL, Role, Salary, Shift } = useLoaderData()
    console.log(Phone)
    console.log(name)
    const { register, handleSubmit, reset } = useForm()

    const { mutateAsync } = useMutation({
        mutationFn: async (employeeUpdateDetails) => {
            const { data } = await axiosSecure.patch(`/addEmployee/${_id}`,employeeUpdateDetails)
            console.log(data)
            return data
        },
        onSuccess: () => {
            // queryClient.invalidateQueries([''])
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Employee details has updated`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    })

    const onSubmit = (data) => {
        console.log(data)

        const employeeUpdateDetails = {
            name: data?.name,
            Department: data?.Department,
            Employee_details: data?.Employee_details,
            Phone: data?.Phone,
            PhotoURL: data?.PhotoURL,
            Role: data?.Role,
            Salary: data?.Salary,
            Shift: data?.Shift,
        }

        mutateAsync(employeeUpdateDetails)

    }

    return (
        <div>
            <SelectedTitle
                subHeading="Hurry Up!"
                heading="UPDATE EMPLOYEE DETAILS"
            ></SelectedTitle>

            <div className='w-4/5 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend text-sm">Employee name*</legend>
                        <input {...register('name')} defaultValue={name} type="text" className="input w-full " placeholder={name} />
                    </fieldset>
                    <div className='flex items-center gap-6 my-3'>
                        {/* Department */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Department*</legend>
                            <select defaultValue={Department} {...register("Department")} className="select w-full " >
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
                            <select defaultValue={Role} {...register("Role")} className="select w-full " >
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
                            <select defaultValue={Shift} {...register("Shift")} className="select w-full " >
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
                            <input {...register('PhotoURL')} defaultValue={PhotoURL} type="url" className="input w-full" placeholder={PhotoURL} />
                        </fieldset>

                    </div>

                    <div className='flex items-center gap-6 my-3'>
                        {/* Salary */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Salary*</legend>
                            <input {...register('Salary')} type="number" className="input w-full" placeholder={Salary} defaultValue={Salary} />
                        </fieldset>

                        {/* Phone */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Phone*</legend>
                            <input {...register('Phone')} type="tel" className="input w-full" placeholder={Phone} defaultValue={Phone} />
                        </fieldset>

                    </div>

                    <div>
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Employee Details*</legend>
                            <textarea {...register('Employee_details')} className="textarea  h-24 w-full" placeholder={Employee_details} defaultValue={Employee_details} ></textarea>
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

export default UpdateEmpDetails;