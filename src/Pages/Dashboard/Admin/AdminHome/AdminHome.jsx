import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { GiFoodTruck, GiWallet } from "react-icons/gi";
import { ImUsers } from "react-icons/im";
import { RiAlignItemLeftFill } from "react-icons/ri";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Pie, PieChart, ResponsiveContainer, Legend } from 'recharts';


const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};


const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'pink'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
    const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${((percent ?? 1) * 100).toFixed(0)}%`}
        </text>
    );
};


const AdminHome = () => {

    const axiosSecure = useAxiosSecure()

    const { data: stats = [] } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/admin-stats')
            return data
        }
    })

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/order-stats')
            return data
        }
    })

    const pieChartData = chartData.map(item => {
        return { name: item.category, value: item.revenue }
    })

    console.log(stats)
    return (
        <div>
            <h1 className='font-mono font-semibold text-lg w-11/12 mx-auto'>Hi,WELCOME BACK</h1>
            <div className='grid grid-cols-4 gap-4 w-11/12 mx-auto mt-4 text-white' >
                <div class="h-24 gap-3 bg-linear-to-r from-[#bb34f5] to-[#fcdbff] flex justify-center items-center rounded-lg">
                    <GiWallet className='text-3xl' />
                    <div>
                        <h2 className='text-2xl font-medium'>{stats.revenue}</h2>
                        <h2 className='text-xl font-medium'>Revenue</h2>
                    </div>
                </div>
                <div class="h-24 gap-3 bg-linear-to-r from-[#D3A256] to-[#FDE8C0] flex justify-center items-center rounded-lg">
                    <ImUsers className='text-3xl' />
                    <div>
                        <h2 className='text-2xl font-medium'>{stats.users}</h2>
                        <h2 className='text-xl font-medium'>Customers</h2>
                    </div>
                </div>
                <div class="h-24 gap-3 bg-linear-to-r from-[#FE4880] to-[#FECDE9] flex justify-center items-center rounded-lg">
                    <RiAlignItemLeftFill className='text-3xl' />
                    <div>
                        <h2 className='text-2xl font-medium'>{stats.products}</h2>
                        <h2 className='text-xl font-medium'>Products</h2>
                    </div>
                </div>
                <div class="h-24 gap-3 bg-linear-to-r from-[#6AAEFF] to-[#B6F7FF] flex justify-center items-center rounded-lg">
                    <GiFoodTruck className='text-3xl' />
                    <div>
                        <h2 className='text-2xl font-medium'>{stats.orders}</h2>
                        <h2 className='text-xl font-medium'>Orders</h2>
                    </div>
                </div>
            </div>
            <div className='flex justify-center items-center'>
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">

                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend></Legend>
                    </PieChart>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;