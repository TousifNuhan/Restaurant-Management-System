import React, { useEffect, useState } from 'react';
import SelectedTitle from '../../Shared/SelectedTitle/SelectedTitle';
import MenuItem from '../../Shared/menuItem/menuItem';

const PopularMenu = () => {

    const [menu, setMenu] = useState([])

    useEffect(() => {
        fetch('menu.json')
            .then(res => res.json())
            .then(data => {
                const datas = data.filter(item => item.category === 'popular')
                setMenu(datas)
            })
    }, [])

    return (
        <div>
            <section>
                <SelectedTitle
                    subHeading="Check it out"
                    heading="FROM OUR MENU"
                ></SelectedTitle>
            </section>

            <div className='grid grid-cols-2 gap-10 w-4/5 mx-auto mb-12'>
                {
                    menu.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <div className=' text-center mb-10'>
                <button className="btn btn-outline hover:bg-black hover:text-white border-0 border-b-2 my-2 hover:delay-75 uppercase">Add To Cart</button>
            </div>
        </div>
    );
};

export default PopularMenu;