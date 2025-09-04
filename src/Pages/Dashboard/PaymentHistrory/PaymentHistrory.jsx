import React from 'react';
import SelectedTitle from '../../Shared/SelectedTitle/SelectedTitle';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentHistrory = () => {
    const { user } = UseAuth()
    const axiosSecure = useAxiosSecure()
    console.log(user?.email)

    const { data: payments = [] } = useQuery({
        queryKey: ['paymentHistory', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`)
            return res.data
        }
    })

    return (
        <div>
            <SelectedTitle
                subHeading="At a Glance!"
                heading="PAYMENT HISTORY"
            ></SelectedTitle>

            <div className='w-11/12 mx-auto'>

                <div className="overflow-x-auto">
                    <table className="table">

                        <thead>
                            <tr>
                                <th>#</th>
                                <th>TRANSACTION ID</th>
                                <th>TOTAL PRICE</th>
                                <th>PAYMENT DATE</th>
                                <th>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                payments.map((item, index) => <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.transactionID}</td>
                                    <td>$ {item.price}</td>
                                    <td>{item.date}</td>
                                    <td>{item.status}</td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistrory;