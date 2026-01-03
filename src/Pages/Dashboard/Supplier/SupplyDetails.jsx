import React from 'react';
import SelectedTitle from '../../Shared/SelectedTitle/SelectedTitle';
import { useQuery } from '@tanstack/react-query';
import UseAuth from '../../../hooks/UseAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SupplyDetails = () => {

  const { user, loading } = UseAuth()
  const axiosSecure = useAxiosSecure()

  const { data: datas = [] } = useQuery({
    queryFn: async () => {
      const { data } = await axiosSecure.get('/addSupplyItems')
      return data
    },
    queryKey: [user?.name, 'supplier'],
  })

  return (
    <div>
      <SelectedTitle
        subHeading="What's new?"
        heading="Supplied Details"
      ></SelectedTitle>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr className='text-base'>
              <th>#</th>
              <th>Supply Date</th>
              <th>Status</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {
              datas.map((data, index) =>
                <tr key={data._id}>
                  <th className='text-sm font-medium'>{index+1}</th>
                  <td className='text-sm font-medium'>{data.Supply_Date}</td>
                  <td className='text-sm font-medium'>{data.Status}</td>
                  <td className='text-sm font-medium'>{data.Total_Amount}</td>
                  
                </tr>
              )
            }

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SupplyDetails;