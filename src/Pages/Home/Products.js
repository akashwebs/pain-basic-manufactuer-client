import React from 'react';
import { useQuery } from 'react-query'
import useProdcts from '../../Hooks/useProdcts';
import Loading from '../../Shared/Loading';
import Product from './Product';

const Products = () => {
   const [products,isLoading,refetch]=useProdcts()
    
    if(isLoading){
        return <Loading></Loading>
    }
    
    return (
        <div className='px-24'>
            <h2>this is products seciont  {products?.length}</h2>
           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
           {
                products.slice(0,3).map(product=><Product
                key={product._id}
                product={product}
                ></Product>)
            }
           </div>
        </div>
    );
};

export default Products;