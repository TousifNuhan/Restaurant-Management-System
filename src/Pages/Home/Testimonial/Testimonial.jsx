import React, { useEffect, useState } from 'react';
import SelectedTitle from '../../Shared/SelectedTitle/SelectedTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaQuoteLeft } from "react-icons/fa";
import '@smastrom/react-rating/style.css'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import { Rating } from '@smastrom/react-rating';

const Testimonial = () => {

    const [reviews, setReviews] = useState([])

    // const { name, details, rating } = reviews

    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    }, [])

    return (
        <div className='my-20'>
            <section>
                <SelectedTitle
                    subHeading="What Our Clients Say"
                    heading="TESTIMONIALS"
                ></SelectedTitle>
            </section>

            <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-4/5 mx-auto">
                {
                    reviews.map(item =>
                        <SwiperSlide key={item._id}>
                            <div className='text-start flex flex-col items-center'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={item.rating}
                                    readOnly
                                />
                                <FaQuoteLeft className='h-16 w-14 mt-8 mb-5' />
                                <p className='w-4/5 text-[#444444] text-base'>{item.details}</p>
                                <h4 className='text-xl font-semibold mt-2 text-[#CD9003]'>{item.name}</h4>
                            </div>
                        </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonial;