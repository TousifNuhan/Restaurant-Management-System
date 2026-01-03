import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { GiFoodTruck } from 'react-icons/gi';
import { TbCurrencyTaka } from "react-icons/tb";
import {
  BarChart, Bar, Cell, XAxis, YAxis,
  CartesianGrid, Pie, PieChart, Legend
} from 'recharts';

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SupplierHome = () => {

    const axiosSecure = useAxiosSecure();

    const { data: supplies = [] } = useQuery({
        queryKey: ['supplier-supplies'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/addSupplyItems');
            return data;
        }
    });

    
    const paidOrders = supplies.filter(item => item.Status === "Paid");

    
    const totalRevenue = paidOrders.reduce(
        (sum, item) => sum + Number(item.Total_Amount),
        0
    );

    const barChartData = paidOrders.map(item => ({
        date: item.Supply_Date,
        amount: Number(item.Total_Amount)
    }));

    return (
        <div>
            <h1 className='font-mono font-semibold text-lg w-11/12 mx-auto'>
                Hi, WELCOME BACK
            </h1>

            {/* ===== STAT CARDS ===== */}
            <div className='grid grid-cols-4 gap-4 w-11/12 mx-auto mt-4 text-white'>

                <div className="h-24 gap-3 bg-linear-to-r from-[#FE4880] to-[#FECDE9] flex justify-center items-center rounded-lg">
                    <TbCurrencyTaka className='text-3xl' />
                    <div>
                        <h2 className='text-2xl font-medium'>{totalRevenue}</h2>
                        <h2 className='text-xl font-medium'>Total Paid</h2>
                    </div>
                </div>

                <div className="h-24 gap-3 bg-linear-to-r from-[#6AAEFF] to-[#B6F7FF] flex justify-center items-center rounded-lg">
                    <GiFoodTruck className='text-3xl' />
                    <div>
                        <h2 className='text-2xl font-medium'>{paidOrders.length}</h2>
                        <h2 className='text-xl font-medium'>Orders Completed</h2>
                    </div>
                </div>

            </div>

            {/* ===== BAR CHART ===== */}
            <div className='flex justify-center mt-10'>
                <BarChart
                    width={600}
                    height={350}
                    data={barChartData}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Bar dataKey="amount">
                        {barChartData.map((_, index) => (
                            <Cell key={index} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </div>
        </div>
    );
};

export default SupplierHome;
