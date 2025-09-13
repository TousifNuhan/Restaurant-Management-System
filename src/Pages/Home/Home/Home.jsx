import React from 'react';
import Banner from '../Banner/Banner';
import Category from '../Category/Category';
import PopularMenu from '../PopularMenu/PopularMenu';
import Call from '../Call/Call';
import ChefRecomends from '../ChefRecomends/ChefRecomends';
import Feature from '../Feature/Feature';
import Testimonial from '../Testimonial/Testimonial';
import { Helmet } from 'react-helmet-async';
const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Central Park BD | Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Call></Call>
            <ChefRecomends></ChefRecomends>
            <Feature></Feature>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;