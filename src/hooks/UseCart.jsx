import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import UseAuth from './UseAuth';

const UseCart = () => {

    const {user}=UseAuth()
    const axiosSecure=useAxiosSecure()

    const {refetch,data:cart=[]}=useQuery({
        queryFn:async()=>{
            const {data}= await axiosSecure.get(`/carts?email=${user.email}`)
            return data
        },
        queryKey:['cart']
    })

    return[cart,refetch]
   
};

export default UseCart;