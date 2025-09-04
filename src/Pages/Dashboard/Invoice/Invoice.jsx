import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAxiosPublic from '../../../hooks/UseAxiosPublic';
import UseAuth from '../../../hooks/UseAuth';
import logo from '../../../assets/logo.png'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Printer, Send } from 'lucide-react';

const Invoice = () => {
    const location = useLocation()
    const { user } = UseAuth()

    const { transactionIDs } = location?.state || {}
    console.log(transactionIDs)
    const axiosSecure = useAxiosSecure()

    const { data: invoice = {}, isLoading } = useQuery({
        enabled: !!transactionIDs,
        queryKey: ['invoice', transactionIDs],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/invoice/${transactionIDs}`);
            return data;
        },
    });

    console.log(invoice)
    const { name, email, price, date, cardIDs, menuItemIDs } = invoice

    const { data: invoiceDetails = [] } = useQuery({
        // enabled: menuItemIDs.length > 0,
        queryKey: ['invoice-ids'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/menus`, { params: { ids: menuItemIDs.join(',') } })
            return data
        }
    })

    console.log(invoiceDetails)
    const dates = new Date().toLocaleDateString()

    const quantityMap = (menuItemIDs || []).reduce((acc, id) => {
        acc[id] = (acc[id] || 0) + 1       // check basics.json file 
        return acc
    }, {})

    const [isPrinting,setIsPrinting]=useState(false)

    const doPrint = () => {
        setIsPrinting(true)
        window.print()
        setIsPrinting(()=>setIsPrinting(false,500))
    }

    return (
    
        // <div>
        //     <div className='flex justify-between items-center w-11/12 mx-auto'>
        //         <img className='h-24' src={logo} alt="" />
        //         <h1 className='text-4xl font-semibold mt-3'>INVOICE</h1>
        //     </div>
        //     <div className='w-11/12 mx-auto flex justify-between mt-16'>
        //         <div className=''>
        //             <h3 className='text-lg font-bold'>BILLED TO:</h3>
        //             <h3 className='text-base font-medium mt-1'>{name}</h3>
        //             <h3 className='text-base font-medium'>{email}</h3>
        //         </div>
        //         <div>
        //             <h3 className='text-base font-medium'>Invoice No. {(Math.random()*10000).toFixed().padStart(5,"0")} </h3>
        //             <h3 className='text-base font-medium'>Date: {dates}</h3>
        //         </div>
        //     </div>
        //     <div className='w-11/12 mx-auto'>
        //         <div className="overflow-x-auto">
        //             <table className="table table-zebra">
        //                 {/* head */}
        //                 <thead>
        //                     <tr>
        //                         <th></th>
        //                         <th>Name</th>
        //                         <th>Job</th>
        //                         <th>Favorite Color</th>
        //                     </tr>
        //                 </thead>
        //                 <tbody>
        //                     {/* row 1 */}
        //                     <tr>
        //                         <th>1</th>
        //                         <td>Cy Ganderton</td>
        //                         <td>Quality Control Specialist</td>
        //                         <td>Blue</td>
        //                     </tr>

        //                 </tbody>
        //             </table>
        //         </div>
        //     </div>
        // </div>
        <div className="bg-gray-100 p-8 min-h-screen">
            <div id='invoice' className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
                {/* Action Buttons */}
                <div className="flex justify-end gap-2 mb-4 print:hidden">
                   <Link to="/">
                    <button  className="btn btn-outline">Go Home</button>
                   </Link>
                    <button
                        onClick={doPrint}
                        className="flex items-center border rounded px-3 py-1.5 text-sm  btn btn-outline btn-secondary"
                    >
                        <Printer className="mr-2 h-4 w-4 " />
                        Print
                    </button>
                    <button
                        className="flex items-center border rounded px-3 py-1.5 text-sm btn btn-outline btn-primary">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                    </button>
                    <button className="flex items-center bg-blue-600 text-white rounded px-3 py-1.5 text-sm hover:bg-blue-700">
                        <Send className="mr-2 h-4 w-4" />
                        Email Invoice
                    </button>
                </div>
                {/* Header */}
                <div className="flex justify-between items-center pb-4 mb-4">
                    <img className='h-24 text-black' src={logo} alt="" />
                    <h1 className="text-6xl font-bold">Invoice</h1>
                </div>

                <div className='flex justify-between mt-20'>
                    {/* Billed To */}
                    <div className="mb-6">
                        <h2 className="text-lg font-bold mb-1">BILLED TO:</h2>
                        <p className='text-sm font-semibold'>{name}</p>
                        <p className='text-sm font-semibold'>{email}</p>
                    </div>

                    {/* Invoice No */}
                    <div className="text-right">
                        <p className="font-bold">Invoice No. {(Math.random() * 10000).toFixed().padStart(5, "0")
                        }</p>
                        <p>{dates}</p>
                    </div>
                </div>

                {/* Items Table */}
                <table className="w-full border border-gray-300 mt-5 mb-6">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                            <th className="border border-gray-300 px-4 py-2">Quantity</th>
                            <th className="border border-gray-300 px-4 py-2">Unit Price</th>
                            <th className="border border-gray-300 px-4 py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            invoiceDetails.map(item => <tr key={item._id}>
                                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{quantityMap[item._id]}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">${item.price}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">$ {(Number(item.price) * quantityMap[item._id]).toFixed(2)} </td>
                            </tr>)
                        }

                        {/* Totals */}
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 font-semibold">Subtotal</td>
                            <td className="border border-gray-300"></td>
                            <td className="border border-gray-300"></td>
                            <td className="border border-gray-300 px-4 py-2 text-center">$ {price}</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 font-semibold">Tax (0%)</td>
                            <td className="border border-gray-300"></td>
                            <td className="border border-gray-300"></td>
                            <td className="border border-gray-300 px-4 py-2 text-center">$0</td>
                        </tr>
                        <tr className="bg-gray-200 font-bold">
                            <td className="border border-gray-300 px-4 py-2">Total</td>
                            <td className="border border-gray-300"></td>
                            <td className="border border-gray-300"></td>
                            <td className="border border-gray-300 px-4 py-2 text-center">$ {price}</td>
                        </tr>
                    </tbody>
                </table>

                {/* Footer */}
                <div className="text-center mt-8 space-y-2 text-sm text-gray-600">
                    <p>Thank you for purchasing!</p>
                    <p>We hope you enjoy your order. 😊</p>
                    <p>If you have any questions or concerns, please contact us at <a href="mailto:support@example.com" className="text-blue-500 underline">support@spyhere.com</a>.</p>
                    <p>Visit our website for more products: <a href="https://www.sypyhereRestaurant.com" className="text-blue-500 underline">www.sypyhereRestaurant.com</a></p>
                    <p>Follow us on social media for updates and promotions!</p>
                    <p className="mt-4 font-semibold">We look forward to serving you again!</p>
                </div>
            </div>
        </div>
    );
};

export default Invoice;