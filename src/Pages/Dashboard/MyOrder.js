import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../Firebase.init';
import Loading from '../../Shared/Loading';
import Order from './Order';


const MyOrder = () => {
    const [user] = useAuthState(auth)

    const { data: orders, isLoading } = useQuery('myorders', () => fetch(`http://localhost:5000/orders/${user?.email}`, {
        headers: {
            authorization: `Beeraar ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))


    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2>this is my order page:{orders?.length}</h2>

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
                           orders.map((order,index)=><Order
                           key={order._id}
                           order={order}
                           index={index}
                           ></Order>)
                       }
                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MyOrder;