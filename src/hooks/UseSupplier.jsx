import { useQuery } from '@tanstack/react-query';
import React from 'react';
import UseAuth from './UseAuth';

import useAxiosSecure from './useAxiosSecure';


const UseSupplier = () => {

    const { user, loading } = UseAuth()
    const axiosSecure=useAxiosSecure()
    // const axiosPublic = UseAxiosPublic()

    const { data: isSupplier, isPending: isSupplierLoading } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: [user?.email, 'isSupplier'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/supplier/${user?.email}`)
            // console.log(data)
            return data.isSupplier

        }
    })
    // console.log(isSupplier)
    return [isSupplier, isSupplierLoading]
};

export default UseSupplier;