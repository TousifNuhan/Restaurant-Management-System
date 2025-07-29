import React from 'react';
import UseAuth from './UseAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const UseAdmin = () => {

    const { user, loading } = UseAuth()
    const axiosSecure = useAxiosSecure()

    const { data: isAdmin, isPending: isAdminLoading, } = useQuery({
        enabled: !loading && !!user?.email,
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/admin/${user?.email}`)
            return data.admin
        }
    })

    return [isAdmin, isAdminLoading]
};

export default UseAdmin;