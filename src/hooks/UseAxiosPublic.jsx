import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL: "https://restaurant-management-system-server-nine.vercel.app"
})

const UseAxiosPublic = () => {
    return axiosPublic
};

export default UseAxiosPublic;