import React from 'react';
import FoodCart from '../../../Components/FoodCart/FoodCart';

const OrderTab = ({items}) => {
    return (
        <div>
            <div className='grid grid-cols-3 gap-10 w-11/12 mx-auto'>
                {
                    items.map(item => <FoodCart
                    key={item._id}
                        items={item}
                    ></FoodCart>)
                }
            </div>
        </div>
    );
};

export default OrderTab;