import React, { useState } from 'react';
import Cover from '../../Shared/Cover/Cover';
import img from '../../../assets/shop/banner2.jpg'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import UseMenu from '../../../hooks/UseMenu';
import FoodCart from '../../../Components/FoodCart/FoodCart';
import OrderTab from '../OrderTab/OrderTab';
import { useParams } from 'react-router-dom';

const Order = () => {
    const categories = ['salad', 'pizza', 'soup', 'dessert', 'drinks']
    const { category } = useParams()
    const initialIndex = categories.indexOf(category)
    // const indexs=initialIndex ? initialIndex: 0
    const [tabIndex, setTabIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
    // const [tabIndex, setTabIndex] = useState(initialIndex >= 0 ? initialIndex : 0);
    // const [tabIndex, setTabIndex] = useState(initialIndex )

    const [menu] = UseMenu()
    console.log(menu)
    const soup = menu.filter(item => item.category === 'soup')
    const desserts = menu.filter(item => item.category === 'dessert')
    const salads = menu.filter(item => item.category === 'salad')
    const pizzas = menu.filter(item => item.category === 'pizza')
    const drinks = menu.filter(item => item.category === 'drinks')

    return (
        <div >
            <Cover
                img={img}
                title="OUR SHOP"
                p="Would you like to try a dish?"
            ></Cover>
            <Tabs className='my-10' defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>SALAD</Tab>
                    <Tab>PIZZA</Tab>
                    <Tab>SOUPS</Tab>
                    <Tab>DESSERTS</Tab>
                    <Tab>DRINKS</Tab>
                </TabList>
                <TabPanel>
                    <OrderTab
                        items={salads}
                    ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={pizzas}
                    ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={soup}
                    ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={desserts}
                    ></OrderTab>
                </TabPanel>
                <TabPanel>
                    <OrderTab
                        items={drinks}
                    ></OrderTab>
                </TabPanel>


            </Tabs>
        </div>
    );
};

export default Order;