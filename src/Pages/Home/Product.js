import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const {_id, name, price, discripton, stock, minOrder,image } = product
    
    
    return (
        <div class="card bg-base-100 shadow-xl">
            <figure>
                <img className='h-[170px] w-full' src={image} alt="" />
            </figure>
            <div class="card-body">
                <div className='flex justify-between items-center'>
                    <div class="text-2xl">{name}</div>
                    
                </div>
                <p className='text-neutral'>{discripton.slice(0,120)}</p>

                <div>
                <div className='text-3xl text-primary font-bold'>${price}</div>
                    <p><strong>Minimum Order:</strong> {minOrder}</p>
                    <p><strong>stock:</strong> {stock}</p>
                </div>
               
                <div class="card-actions justify-start">
                    <Link to={`products/${_id}`} class="btn btn-primary text-white">Place Order</Link>
                </div>
            </div>
        </div>
    );
};

export default Product;