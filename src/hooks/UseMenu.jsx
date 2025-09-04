import React, { useEffect, useState } from 'react';
import { useQuery } from "@tanstack/react-query"
import UseAxiosPublic from './UseAxiosPublic';
const UseMenu = () => {
    //  const [menu, setMenu] = useState([])
    const axiosPublic = UseAxiosPublic()

    // useEffect(() => {
    //     fetch('http://localhost:5000/menu')
    //         .then(res => res.json())
    //         .then(data => {
    //             // const datas = data.filter(item => item.category === 'popular')
    //             setMenu(data)
    //         })
    // }, [])

    const { data: menu = [], refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/menu')
            return data
        }
    })

    return [menu, refetch]
};

export default UseMenu;