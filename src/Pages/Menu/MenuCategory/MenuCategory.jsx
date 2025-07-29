import React from 'react';
import MenuItem from '../../Shared/menuItem/menuItem';
import { Link } from 'react-router-dom';

const MenuCategory = ({ items,title }) => {
    console.log(items)
    return (
        <div >
            <div className='grid grid-cols-2 gap-10 w-4/5 mx-auto mb-12'>
                {
                    items.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className='text-center mb-12'>
                <Link to={`/order/${title}`}>
                    <button className="btn btn-outline hover:bg-black hover:delay-75 hover:text-white border-0 border-b-2 my-2">Order your favourite food</button>
                </Link>
            </div>
        </div>
    );
};

export default MenuCategory;