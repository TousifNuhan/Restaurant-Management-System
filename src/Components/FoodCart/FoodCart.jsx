import React from 'react';
import UseAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import UseCart from '../../hooks/UseCart';

const FoodCart = ({ items }) => {
    const { name, recipe, image, price, _id } = items
    const { user } = UseAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const [,refetch]=UseCart()

    const submitCard = (food) => {
        console.log(food, _id)
        if (user && user.email) {
            const foodCarts = {
                menuID: food._id,
                email: user?.email,
                name: food.name,
                recipe: food.recipe,
                image: food.image,
                price: food.price
            }

            axiosSecure.post("/carts", foodCarts)
                .then(res => {
                    console.log(res.data)
                    if (res.data.acknowledged) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} has been added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });
                        refetch()
                    }
                })
        }
        else {
            Swal.fire({
                title: "Your're not logged in!",
                text: "Please login to add the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => submitCard(items)} className="btn btn-outline hover:bg-black hover:text-white border-0 border-b-2 my-2 hover:delay-75 uppercase">Add To Cart</button>
                    </div>
                </div>
                <div className='absolute right-5 bg-[#111827] text-white px-5 mt-2'>
                    <p>$ {price}</p>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;