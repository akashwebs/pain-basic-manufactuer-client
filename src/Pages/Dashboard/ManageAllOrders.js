import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import ManageOrder from './ManageOrder';

const ManageAllOrders = () => {

    const { data: orders, isLoading,refetch } = useQuery('mangeAllOrdres', () => fetch(`http://localhost:5000/orders/`, {
        headers: {
            authorization: `Beeraar ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    if (isLoading) {
        return <Loading></Loading>
    }

    
    
    return (
        <div>
            <h2 className='text-4xl font-bold'>Manage All Order</h2>
            <div className="divider"></div>
          
            <div class="overflow-x-auto">
                <table class="table w-full">
                   
                    <thead className=''>
                        <tr>
                            <th></th>
                            <th>Customare name</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>quantity</th>
                            <th>Order Amount</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>action</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                      {
                           orders?.map((order,index)=><ManageOrder
                           key={order?._id}
                           order={order}
                           index={index}
                           refetch={refetch}
                           ></ManageOrder>)
                       } 
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageAllOrders;