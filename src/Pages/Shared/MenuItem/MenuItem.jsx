import React from 'react';

const MenuItem = ({ item }) => {
    const { name, recipe, image, price } = item
    return (
        <div className='flex space-x-4'>
            <img className='w-24 rounded-tr-4xl rounded-br-4xl rounded-bl-4xl ' src={image} alt="" />
            <div>
                <h3 className='font-semibold'>{name} ----------</h3>
                <p className='text-[#737373]'>{recipe}</p>
            </div>
            <p className='text-[#bb8506]'>${price}</p>
        </div>
    );
};

export default MenuItem;