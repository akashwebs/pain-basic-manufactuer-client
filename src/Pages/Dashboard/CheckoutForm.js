import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Pyment from './Pyment';

const CheckoutForm = ({ products }) => {
    const stripe = useStripe();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const elements = useElements();
    const [transactionId, setTransactionId] = useState('');
    const [success, setSuccess] = useState('');
    const [processing, setProcessing] = useState(false);
    
    const { _id, totalPrice, email, name } = products;

   useEffect(() => {
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ price: totalPrice })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret);
                }
            });

    }, [totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
 
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        setCardError(error?.message || '')
        setSuccess('');
        setProcessing(true);
        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: email
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError?.message);
            setProcessing(false);
        }
        else {
            setCardError('');
            setTransactionId(paymentIntent.id);
            setSuccess('Congrats! Your payment is completed.')
            
            
            const payment = {
                appointment: _id,
                transactionId: paymentIntent.id,
                paid:true,
                pandingStatus:true

            }
            
           fetch(`http://localhost:5000/orders/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            }).then(res=>res.json())
            .then(data => {
                setProcessing(false);
               
            })

        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-success btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret || success}>
                    Pay
                </button>
            </form>
          {
                cardError && <p className='text-primary'>{cardError}</p>
            } 
             {
                success && <div className='text-primary'>
                    <p>{success}  </p>
                    <p>Your transaction Id: <span className="text-accent font-bold">{transactionId}</span> </p>
                </div>
            } 
        </>
    );
};

export default CheckoutForm;