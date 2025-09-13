import React from 'react';
import { Helmet } from 'react-helmet';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg'
import desert from '../../../assets/menu/dessert-bg.jpeg'
import pizza from '../../../assets/menu/pizza-bg.jpg'
import salad from '../../../assets/menu/salad-bg.jpg'
import SelectedTitle from '../../Shared/SelectedTitle/SelectedTitle';
import MenuItem from '../../Shared/menuItem/menuItem';
import UseMenu from '../../../hooks/UseMenu';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
    // const [menu, setMenu] = useState([])

    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const datas = data.filter(item => item.category === 'popular')
    //             setMenu(datas)
    //         })
    // }, [])

    const [menu]=UseMenu()
    const offers= menu.filter(item=> item.category ==='offered')
    console.log(offers)
    const desserts= menu.filter(item=> item.category ==='dessert')
    console.log(desserts)
    const salads= menu.filter(item=> item.category ==='salad')
    const pizzas= menu.filter(item=> item.category ==='pizza')

    return (
        <div>
            <Helmet>
                <title>Central Park BD | Menu</title>
            </Helmet>
            <div>
                <Cover
                    img={menuImg}
                    title="OUR MENU"
                    p="Would you like to try a dish?"
                ></Cover>
                <div className='mt-10'>
                    <SelectedTitle
                        subHeading="Don't miss"
                        heading="TODAY'S OFFER"
                    ></SelectedTitle>
                    {/* <div className='grid grid-cols-2 gap-10 w-4/5 mx-auto mb-12'>
                        {
                            menu.map(item => <MenuItem
                                key={item._id}
                                item={item}
                            ></MenuItem>)
                        }
                    </div> */}
                    <MenuCategory
                    items={offers}
                    title="offered"
                    ></MenuCategory>
                    {/* <div className='text-center mb-12'>
                        <button className="btn btn-neutral btn-outline">Order Your Favourite Food</button>
                    </div> */}
                </div>
            </div>
            <div>
                <Cover
                    img={desert}
                    title="DESSERTS"
                    p="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                ></Cover>
                <div className='mt-10'>

                    {/* <div className='grid grid-cols-2 gap-10 w-4/5 mx-auto mb-12'>
                        {
                            menu.map(item => <MenuItem
                                key={item._id}
                                item={item}
                            ></MenuItem>)
                        }
                    </div> */}
                    <MenuCategory
                    items={desserts}
                    title="dessert"
                    ></MenuCategory>
                    {/* <div className=' text-center mb-12'>
                        <button className="btn btn-neutral btn-outline">Order Your Favourite Food</button>
                    </div> */}
                </div>
            </div>
            <div>
                <Cover
                    img={pizza}
                    title="PIZZA"
                    p="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                ></Cover>
                <div className='mt-10'>

                    {/* <div className='grid grid-cols-2 gap-10 w-4/5 mx-auto mb-12'>
                        {
                            menu.map(item => <MenuItem
                                key={item._id}
                                item={item}
                            ></MenuItem>)
                        }
                    </div> */}
                    <MenuCategory
                    items={pizzas}
                    title="pizza"
                    ></MenuCategory>
                    
                    {/* <div className=' text-center mb-12'>
                        <button className="btn btn-neutral btn-outline">Order Your Favourite Food</button>
                    </div> */}
                </div>
            </div>
            <div>
                <Cover
                    img={salad}
                    title="SALADS"
                    p="Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                ></Cover>
                <div className='mt-10'>

                    {/* <div className='grid grid-cols-2 gap-10 w-4/5 mx-auto mb-12'>
                        {
                            menu.map(item => <MenuItem
                                key={item._id}
                                item={item}
                            ></MenuItem>)
                        }
                    </div> */}
                    <MenuCategory
                    items={salads}
                    title="salad"
                    ></MenuCategory>
                    {/* <div className=' text-center mb-12'>
                        <button className="btn btn-neutral btn-outline">Order Your Favourite Food</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Menu;