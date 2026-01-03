import React from 'react';
import { useForm } from 'react-hook-form';
import SelectedTitle from '../../Shared/SelectedTitle/SelectedTitle';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AddSupply = () => {

    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm()

    const { mutateAsync } = useMutation({
        mutationFn: async (productdetails) => {
            const { data } = await axiosSecure.post("/addSupplyItems", productdetails)
            return data
        },
        onSuccess: () => {
            reset()
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Supplier product details has been added to your cart",
                showConfirmButton: false,
                timer: 1500
            });

        }
    })

    const date= new Date().toISOString().split('T')[0] 
    const onSubmit = data => {
        console.log(data)
        const productdetails = {
            Rice: data?.Rice,
            Basmati_Rice: data?.Basmati_Rice,
            Chickpeas: data?.Chickpeas,
            Cooking_Oil: data?.Cooking_Oil,
            Flour: data?.Flour,
            Lentils: data?.Lentils,
            Salt: data?.Salt,
            Sugar: data?.Sugar,
            Supply_Date:date,
            Status: "Paid",
            Total_Amount: data?.Total_Amount,
        }
        mutateAsync(productdetails)

    }

    return (
        <div>
            <SelectedTitle
                subHeading="Hurry Up!"
                heading="ADD SUPPLIED ITEMS"
            ></SelectedTitle>
            <div className='w-4/5 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className='flex items-center gap-6 my-3'>
                        {/* Rice */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Rice*</legend>
                            <select
                                // defaultValue={Department}
                                {...register("Rice")} className="select w-full " >
                                <option disabled={true} value="default">Select an amount</option>
                                <option value="0 kg">0 kg</option>
                                <option value="20 kg">20 kg</option>
                                <option value="25 kg">25 kg</option>
                                <option value="30 kg">30 kg</option>
                                <option value="40 kg">40 kg</option>
                                <option value="50 kg">50 kg</option>

                            </select>
                        </fieldset>

                        {/* Basmati Rice */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Basmati Rice*</legend>
                            <select
                                // defaultValue={Department}
                                {...register("Basmati_Rice")} className="select w-full " >
                                <option disabled={true} value="default">Select an amount</option>
                                <option value="0 kg">0 kg</option>
                                <option value="20 kg">20 kg</option>
                                <option value="25 kg">25 kg</option>
                                <option value="30 kg">30 kg</option>
                                <option value="40 kg">40 kg</option>
                                <option value="50 kg">50 kg</option>

                            </select>
                        </fieldset>

                    </div>
                    <div className='flex items-center gap-6 my-3'>
                        {/* Flour */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Flour*</legend>
                            <select
                                // defaultValue={Department}
                                {...register("Flour")} className="select w-full " >
                                <option disabled={true} value="default">Select an amount</option>
                                <option value="0 kg">0 kg</option>
                                <option value="20 kg">20 kg</option>
                                <option value="25 kg">25 kg</option>
                                <option value="30 kg">30 kg</option>
                                <option value="40 kg">40 kg</option>
                                <option value="50 kg">50 kg</option>

                            </select>
                        </fieldset>

                        {/* Sugar */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Sugar*</legend>
                            <select
                                // defaultValue={Department}
                                {...register("Sugar")} className="select w-full " >
                                <option disabled={true} value="default">Select an amount</option>
                                <option value="0 kg">0 kg</option>
                                <option value="20 kg">20 kg</option>
                                <option value="25 kg">25 kg</option>
                                <option value="30 kg">30 kg</option>
                                <option value="40 kg">40 kg</option>
                                <option value="50 kg">50 kg</option>

                            </select>
                        </fieldset>

                    </div>

                    <div className='flex items-center gap-6 my-3'>
                        {/* Salt */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Salt*</legend>
                            <select
                                // defaultValue={Department}
                                {...register("Salt")} className="select w-full " >
                                <option disabled={true} value="default">Select an amount</option>
                                <option value="0 kg">0 kg</option>
                                <option value="20 kg">20 kg</option>
                                <option value="25 kg">25 kg</option>
                                <option value="30 kg">30 kg</option>
                                <option value="40 kg">40 kg</option>
                                <option value="50 kg">50 kg</option>

                            </select>
                        </fieldset>

                        {/* Lentils */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Lentils*</legend>
                            <select
                                // defaultValue={Department}
                                {...register("Lentils")} className="select w-full " >
                                <option disabled={true} value="default">Select an amount</option>
                                <option value="0 kg">0 kg</option>
                                <option value="20 kg">20 kg</option>
                                <option value="25 kg">25 kg</option>
                                <option value="30 kg">30 kg</option>
                                <option value="40 kg">40 kg</option>
                                <option value="50 kg">50 kg</option>

                            </select>
                        </fieldset>

                    </div>

                    <div className='flex items-center gap-6 my-3'>
                        {/* Chickpeas */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Chickpeas*</legend>
                            <select
                                // defaultValue={Department}
                                {...register("Chickpeas")} className="select w-full " >
                                <option disabled={true} value="default">Select an amount</option>
                                <option value="0 kg">0 kg</option>
                                <option value="20 kg">20 kg</option>
                                <option value="25 kg">25 kg</option>
                                <option value="30 kg">30 kg</option>
                                <option value="40 kg">40 kg</option>
                                <option value="50 kg">50 kg</option>

                            </select>
                        </fieldset>

                        {/* Cooking Oil */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Cooking Oil*</legend>
                            <select
                                // defaultValue={Department}
                                {...register("Cooking_Oil")} className="select w-full " >
                                <option disabled={true} value="default">Select an amount</option>
                                <option value="0 kg">0 kg</option>
                                <option value="20 kg">20 kg</option>
                                <option value="25 kg">25 kg</option>
                                <option value="30 kg">30 kg</option>
                                <option value="40 kg">40 kg</option>
                                <option value="50 kg">50 kg</option>

                            </select>
                        </fieldset>

                    </div>

                    <div>
                        <fieldset className="fieldset w-full" >
                            <legend className="fieldset-legend text-sm">Total Amount*</legend>
                            <input required {...register('Total_Amount')} type="number" className="input w-full"
                            // placeholder={Salary} defaultValue={Salary} 
                            />
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

export default AddSupply;