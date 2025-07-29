import React from 'react';
import SelectedTitle from '../../Shared/SelectedTitle/SelectedTitle';
import img from '../../../assets/home/slide1.jpg'

const ChefRecomends = () => {
    return (
        <div className='mb-14'>
            <section>
                <SelectedTitle
                    subHeading="Should Try"
                    heading="CHEF RECOMMENDS"
                ></SelectedTitle>
            </section>
            <div className='grid grid-cols-3 gap-6 w-4/5 mx-auto'>
                <div className="card bg-base-100 w-full shadow-sm">
                    <figure className="px-10 pt-10">
                        <img
                            src={img}
                            alt="Shoes"
                            className="rounded-xl h-96" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions">
                            <button className="btn btn-outline hover:bg-black hover:text-[#BB8506] border-0 border-[#BB8506] border-b-2 hover:border-b-0 my-2 uppercase delay-75">Add To Cart</button>
                        </div>
                    </div>
                </div>
                 <div className="card bg-base-100 w-full shadow-sm">
                    <figure className="px-10 pt-10">
                        <img
                            src={img}
                            alt="Shoes"
                            className="rounded-xl h-96" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions">
                            <button className="btn btn-outline hover:bg-black hover:text-[#BB8506] border-0 border-[#BB8506] border-b-2 hover:border-b-0 my-2 uppercase">Add To Cart</button>
                        </div>
                    </div>
                </div>
                  <div className="card bg-base-100 w-full shadow-sm">
                    <figure className="px-10 pt-10">
                        <img
                            src={img}
                            alt="Shoes"
                            className="rounded-xl h-96" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">Caeser Salad</h2>
                        <p>Lettuce, Eggs, Parmesan Cheese, Chicken Breast Fillets.</p>
                        <div className="card-actions">
                            <button className="btn btn-outline hover:bg-black hover:text-[#BB8506] border-0 border-[#BB8506] border-b-2 hover:border-b-0 my-2 uppercase">Add To Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChefRecomends;