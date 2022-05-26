import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../Firebase.init';
import Loading from '../../Shared/Loading';
import Order from './Order';


const MyOrder = () => {
    const [user] = useAuthState(auth)

    const { data: orders, isLoading,refetch } = useQuery('myorders', () => fetch(`http://localhost:5000/orders/${user?.email}`, {
        headers: {
            authorization: `Beeraar ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className='md:flex justify-between'>
                <h2 className='text-3xl'>My Orders </h2>
                <p className='lg:pr-5 text-xl'>total:{orders?.length}</p>
            </div>
            <div class="divider"></div>
            <div class="overflow-x-auto">
                <table class="table w-full">
                   
                    <thead className=''>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>TotalPrice</th>
                            <th>action</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                      {
                           orders?.map((order,index)=><Order
                           key={order?._id}
                           order={order}
                           index={index}
                           refetch={refetch}
                           ></Order>)
                       } 
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MyOrder;