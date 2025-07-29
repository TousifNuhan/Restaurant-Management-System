import React from 'react';
import SelectedTitle from '../../Shared/SelectedTitle/SelectedTitle';
import './Feature.css'
import img from '../../../assets/home/featured.jpg'

const Feature = () => {
    return (
        <div className='bgIMG relative bg-fixed text-white pt-14 pb-16'>
            <section className='relative z-20'>
                <SelectedTitle
                    subHeading="Check it out"
                    heading="FROM OUR MENU"
                ></SelectedTitle>
            </section>
            <div className='absolute inset-0 bg-[#000000bf] bg-opacity-50 z-10'></div>
            <div className='relative z-20 flex justify-center items-center space-x-10'>
                <div className=' flex-1 flex justify-end '>
                    <img className='h-52 ' src={img} alt="" />
                </div>
                <div className=' flex-1'>
                    <h3>March 20, 2023</h3>
                    <h3 className='my-1'>WHERE CAN I GET SOME?</h3>
                    <p className='w-4/5'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.
                    </p>
                     <button className="btn btn-outline border-0 border-b-2 my-2">Read More</button>
                </div>
            </div>

        </div>
    );
};

export default Feature;