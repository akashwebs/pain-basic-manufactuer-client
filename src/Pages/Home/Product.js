import React from 'react';
import { Link } from 'react-router-dom';

const Product = ({ product }) => {
    const {_id, name, price, discripton, stock, minOrder } = product
    
    
    return (
        <div class="card bg-base-100 shadow-xl">
            <figure>
                <img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" />
            </figure>
            <div class="card-body">
                <div className='flex justify-between items-center'>
                    <div class="text-2xl">{name}</div>
                    <div className='text-2xl text-primary font-bold'>${price}</div>
                </div>
                <p className='text-neutral'>{discripton.slice(0,120)}</p>

                <div>
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