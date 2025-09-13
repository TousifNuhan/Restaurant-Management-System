import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UseAuth from './UseAuth';

const axiosSecure = axios.create({
    baseURL: "https://restaurant-management-system-server-nine.vercel.app"
})

const useAxiosSecure = () => {

    const navigate = useNavigate()
    const { logOut } = UseAuth()

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    // Add a response interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        const status = error.response.status
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/login')
        }
        console.log(status)
        return Promise.reject(error);
    });

    return axiosSecure
};

export default useAxiosSecure;