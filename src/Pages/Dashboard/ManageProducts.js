import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../../Shared/Loading';
import ManageProductRow from './ManageProductRow';

const ManageProducts = () => {

    const { data: products, isLoading,refetch } = useQuery('manageProduct', () => fetch(`http://localhost:5000/products`).then(res => res.json()))


    if (isLoading) {
        return <Loading></Loading>
    }

    
    
    return (
        <div>
            <h2 className='text-4xl'>Manage Product</h2>
            <div className="divider"></div>

            <div>
            
            
            <div class="overflow-x-auto">
                <table class="table w-full">
                   
                    <thead className=''>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Minimu Order</th>
                            <th>TotalPrice</th>
                            <th>Stock</th>
                            <th>action</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                      {
                           products?.map((product,index)=><ManageProductRow
                           key={product?._id}
                           product={product}
                           index={index}
                           refetch={refetch}
                           ></ManageProductRow>)
                       } 
                    </tbody>
                </table>
            </div>


        </div>




          
        </div>
    );
};

export default ManageProducts;