import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { GiFoodTruck, GiWallet } from "react-icons/gi";
import { ImUsers } from "react-icons/im";
import { RiAlignItemLeftFill } from "react-icons/ri";
import {
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Pie,
    PieChart,
    Legend
} from 'recharts';


const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];

const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
    C${x + width / 3},${y + height}
    ${x + width / 2},${y + height / 3}
    ${x + width / 2},${y}
    C${x + width / 2},${y + height / 3}
    ${x + (2 * width) / 3},${y + height}
    ${x + width},${y + height}
    Z`;
};

const TriangleBar = ({ fill, x, y, width, height }) => {
    return <path d={getPath(x, y, width, height)} fill={fill} />;
};

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'pink'];

const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};


const AdminHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/admin-stats');
            return data;
        }
    });

    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get('/order-stats');
            return data;
        }
    });

    const pieChartData = chartData.map(item => ({
        name: item.category,
        value: item.revenue
    }));

    return (
        <div>
            {/* Print Button */}
            <div className="flex justify-end mr-10 mt-4 print:hidden">
                <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-black cursor-pointer text-white rounded"
                >
                    Print Dashboard
                </button>
            </div>

            {/* PRINT AREA */}
            <div id="print-dashboard">
                <h1 className="font-mono font-semibold text-lg w-11/12 mx-auto mt-4">
                    Hi, WELCOME BACK
                </h1>

                {/* CARDS */}
                <div className="grid grid-cols-4 gap-4 w-11/12 mx-auto mt-4 text-white">
                    <div className="h-24 gap-3 bg-gradient-to-r from-[#bb34f5] to-[#fcdbff] flex justify-center items-center rounded-lg">
                        <GiWallet className="text-3xl" />
                        <div>
                            <h2 className="text-2xl font-medium">{stats.revenue}</h2>
                            <h2 className="text-xl font-medium">Revenue</h2>
                        </div>
                    </div>

                    <div className="h-24 gap-3 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] flex justify-center items-center rounded-lg">
                        <ImUsers className="text-3xl" />
                        <div>
                            <h2 className="text-2xl font-medium">{stats.users}</h2>
                            <h2 className="text-xl font-medium">Customers</h2>
                        </div>
                    </div>

                    <div className="h-24 gap-3 bg-gradient-to-r from-[#FE4880] to-[#FECDE9] flex justify-center items-center rounded-lg">
                        <RiAlignItemLeftFill className="text-3xl" />
                        <div>
                            <h2 className="text-2xl font-medium">{stats.products}</h2>
                            <h2 className="text-xl font-medium">Products</h2>
                        </div>
                    </div>

                    <div className="h-24 gap-3 bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF] flex justify-center items-center rounded-lg">
                        <GiFoodTruck className="text-3xl" />
                        <div>
                            <h2 className="text-2xl font-medium">{stats.orders}</h2>
                            <h2 className="text-xl font-medium">Orders</h2>
                        </div>
                    </div>
                </div>

                {/* CHARTS */}
                <div className="flex justify-center items-center mt-10">
                    <div className="w-1/2">
                        <BarChart width={500} height={300} data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Bar
                                dataKey="quantity"
                                shape={<TriangleBar />}
                                label={{ position: 'top' }}
                            >
                                {chartData.map((_, index) => (
                                    <Cell key={index} fill={colors[index % colors.length]} />
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
                                outerRadius={80}
                                labelLine={false}
                                label={renderCustomizedLabel}
                                dataKey="value"
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell
                                        key={entry.name}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Legend />
                        </PieChart>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
