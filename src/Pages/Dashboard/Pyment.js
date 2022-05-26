import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../../Shared/Loading';
import { loadStripe } from '@stripe/stripe-js';

import {
    CardElement,
    Elements,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';



const stripePromise = loadStripe('pk_test_51L2X3YJrNiHevs9j1ySKGIwEfokgmEqQJBbksPwpjzXXJ7rAFkwipm57GNDTLVCaCrj4xQ7Hspvq7uQ0S8lZzTKq00h4NFb3c6');

const Pyment = () => {
    const { idName } = useParams()

    const { data: products, isLoading, refetch } = useQuery(['products', idName], () => fetch(`http://localhost:5000/paymentOrder/${idName}`).then(res => res.json()))

    if (isLoading) { return <Loading></Loading> }




    return (
        <div>
            <h2 className='text-4xl'>Payment</h2>
            <div className="divider"></div>


            <div class="grid md:grid-cols-2 lg:mx-8 gap-5 grid-cols-1 card bg-base-100 shadow-xl">

                <div class="card-body border-2 ">
                    <h2 className="text-3xl"></h2>
                    <img className='w-48 h-48' src={products?.img} alt="" />
                    <h2 class="card-title">{products?.productName}</h2>
                    <p className="text-xl">order Quantity: {products?.quantity}</p>
                    <p className="text-xl">total Amount{products?.price}</p>
                    <p>If a dog chews shoes whose shoes does he choose?</p>

                </div>
                <div class="card-body border-2">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm products={products} />
                    </Elements>

                </div>
            </div>

        </div>
    );
};

export default Pyment;