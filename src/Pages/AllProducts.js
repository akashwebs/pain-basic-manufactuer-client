import React from 'react';
import useProdcts from '../Hooks/useProdcts';
import Loading from '../Shared/Loading';
import Product from './Home/Product';

const AllProducts = () => {
    const [products,isLoading,refetch]=useProdcts()
    
    if(isLoading){
        return <Loading></Loading>
    }
    
    return (
        <div className='px-3 md:px-24 my-12'>
            <div className="text-3xl lg:text-6xl text-center mb-16 text-primary font-extrabold">
                Our best Products
                <p className='text-xl md:text-3xl font-bold mt-4 text-neutral'></p>
            </div>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
           {
                products.map(product=><Product
                key={product._id}
                product={product}
                ></Product>)
            }
           </div>
        </div>
    );
};

export default AllProducts;