import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import Loading from '../../Shared/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../Firebase.init';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Purchase = () => {
    const { id } = useParams();
    const [user, loading, error] = useAuthState(auth);



    const { data: product, isLoading, refetch } = useQuery(['productDetails', id], () => fetch(`http://localhost:5000/products/${id}`)
        .then(res => res.json())
    )


    const [isTrue, setTrue] = useState(false)
    const [quantityValue, setQuantityValue] = useState(product?.minOrder)
    const { register, handleSubmit, reset } = useForm();




    const handlePurchase = (data) => {
        const order = {
            name: user?.displayName,
            email: user?.email,
            phone: data.phone,
            address: data.address,
            quantity: quantityValue,
            totalPrice: price,
            img:product.image
        }
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(order)
        }).then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    toast.success('Order Successfully done ')
                    reset()
                }
            })
    }
    const [price, setPrice] = useState(product?.price || 0)
    const hanleQuantity = (event) => {
        const quantity = event.target.value;
        const minOrder = product?.minOrder;
        const stock = product?.stock;
        if (minOrder < quantity && stock > quantity) {
            setTrue(true)
            setQuantityValue(quantity)
            setPrice(quantity * product?.price)
        } else {
            setTrue(false)
            setPrice(product?.price)
        }
    }


    if (isLoading) { return <Loading></Loading> }

    return (
        <div className=' grid grid-cols-1 md:grid-cols-2 px-24 gap-12 my-12'>
            <div class="card w-full bg-base-100 shadow-xl">
                <div class="card-body">
                    <div>
                        <img src={product.image}  className={'h-48 mx-auto my-5'} alt="" />
                    </div>
                    <div>
                    <p className='text-2xl leading-0 font-bold'>{product?.name}</p>
                    <p className='text-xl my-2'>price: ${product?.price}</p>
                    <p className='text-xl my-2'>stock: {product?.stock}</p>
                    <p className='mt-2'>{product.discripton}</p>
                    </div>
                     
                    
                </div>
            </div>
            <div class="card w-full  bg-base-100 shadow-xl">
                <div class="card-body">
                    <p className='text-3xl font-bold'>Confirm Place Order</p>
                    <form onSubmit={handleSubmit(handlePurchase)} className='grid grid-cols-1' >
                        <input type="text" value={user?.displayName} disabled class="input input-bordered w-full " />
                        <input type="text" value={user?.email} disabled class="input input-bordered mt-3 w-full " />

                        <input {...register("phone")} required type="text" placeholder='Enter your phone' class="input input-bordered mt-3 w-full " />
                        <textarea {...register("address")} required class="textarea mt-3 w-full  textarea-bordered" placeholder="Address"></textarea>

                        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>

                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Available Stock</span>
                                </label>
                                <input type="text" value={product?.stock} disabled class="input input-bordered " />
                                <label class="label">
                                    {/* <span class="label-text-alt">Alt label</span> */}
                                </label>
                            </div>
                            <div class="form-control w-full max-w-xs">
                                <label class="label">
                                    <span class="label-text">Minimum Order: {product?.minOrder}</span>
                                </label>
                                <input name='quantity' onChange={hanleQuantity} type="text" placeholder='Entar Quantity' class="input input-bordered " />

                            </div>
                        </div>
                        <label class="label">
                            <span class="label-text">price: ${product?.price}</span>
                        </label>
                        <input type="text" value={'$' + price} readOnly class="input input-bordered  w-full " />
                        <button name='submit' disabled={!isTrue} class="btn mt-3 btn-accent text-white font-bold text-xl">Purchase </button>
                    </form>
                </div>
            </div>

        </div>

    );
};

export default Purchase;