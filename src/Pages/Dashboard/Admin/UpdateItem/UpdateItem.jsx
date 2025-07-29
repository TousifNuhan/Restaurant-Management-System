import React, { useMemo } from 'react';
import SelectedTitle from '../../../Shared/SelectedTitle/SelectedTitle';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import UseAxiosPublic from '../../../../hooks/UseAxiosPublic';
import { useLoaderData } from 'react-router-dom';
import UseMenu from '../../../../hooks/UseMenu';

const hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const hosting_api = `https://api.imgbb.com/1/upload?key=${hosting_key}`

const UpdateItem = () => {

    const [, refetch] = UseMenu()

    const { name, image, recipe, _id, price, category } = useLoaderData();
    console.log(name)

    const axiosPublic = UseAxiosPublic()
    const axiosSecure = useAxiosSecure()

    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
        console.log(res.data)

        if (res.data.success) {
            const menuItems = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: data.price
            }

            const res2 = await axiosSecure.patch(`/menu/${_id}`, menuItems)
            console.log(res2.data)
            if (res2.data.modifiedCount > 0) {
                refetch()
                reset({
                    name: data.name,
                    recipe: data.recipe,
                    image: res.data.data.display_url,
                    category: data.category,
                    price: data.price 
                })
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} has updated`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

    }

    return (
        <div>
            <SelectedTitle
                subHeading="Hurry Up"
                heading="UPDATE ITEM"
            ></SelectedTitle>
            <div className='w-4/5 mx-auto'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <fieldset className="fieldset w-full">
                        <legend className="fieldset-legend text-sm">Recipe name*</legend>
                        <input {...register('name', { required: true })} type="text" className="input w-full " defaultValue={name} />
                    </fieldset>
                    <div className='flex items-center gap-6 my-3'>
                        {/* category */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Category*</legend>
                            <select defaultValue={category} {...register("category", { required: true })} className="select w-full ">
                                <option disabled={true} value="default">Select a Category</option>
                                <option value="Salad">Salad</option>
                                <option value="Pizza">Pizza</option>
                                <option value="Soup">Soup</option>
                                <option value="Dessert">Dessert</option>
                                <option value="Drinks">Drinks</option>

                            </select>
                        </fieldset>
                        {/* price */}
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Price*</legend>
                            <input {...register('price', { required: true })}
                                defaultValue={price}
                                type="number" className="input  w-full" placeholder="Price" />
                        </fieldset>

                    </div>
                    <div>
                        <fieldset className="fieldset w-full">
                            <legend className="fieldset-legend text-sm">Recipe Details</legend>
                            <textarea {...register('recipe', { required: true })} className="textarea  h-24 w-full" defaultValue={recipe} placeholder="Recipe Details"></textarea>
                        </fieldset>
                    </div>
                    <div>
                        <input {...register('image', { required: true })} type="file" className="file-input file-input-neutral my-5" />
                    </div>


                    <button type='button' className='flex justify-center mb-10 w-full '>
                        <div className='flex items-center py-2 bg-[#835D23] justify-center gap-1 text-white  cursor-pointer px-5'>
                            <input type="submit" value="Update Recipe Details" className='cursor-pointer w-full' />

                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;