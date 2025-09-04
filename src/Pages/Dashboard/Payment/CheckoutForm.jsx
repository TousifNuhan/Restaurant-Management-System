import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseCart from '../../../hooks/UseCart';
import UseAuth from '../../../hooks/UseAuth';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const CheckoutForm = () => {

    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionID, setTransactionID] = useState('')
    const [invoice, setInvoice] = useState(false)
    const { user } = UseAuth()

    const stripe = useStripe()
    const elements = useElements()
    const axiosSecure = useAxiosSecure()
    const [cart, refetch] = UseCart()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.client_secret)
                setClientSecret(res.data.client_secret)
            })
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            console.log(error)
            setError(error.message)
        }
        if (paymentMethod) {
            console.log(paymentMethod)
            setError('')
        }

        // confirm payment

        const { paymentIntent, error: Error } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.name || 'anonymous',
                        email: user?.email || 'anonymous'
                    }
                }
            }
        )

        if (Error) {
            console.log(Error)
        }
        else {
            console.log(paymentIntent)
            if (paymentIntent.status === "succeeded") {
                setTransactionID(paymentIntent.id)

                // now save the payment in the db

                const payment = {
                    name:user?.displayName,
                    email: user?.email,
                    price: totalPrice,
                    transactionID: paymentIntent.id,
                    date: new Date(),
                    cardIDs: cart.map(item => item._id),
                    menuItemIDs: cart.map(item => item.menuID),
                    status: 'pending'
                }

                const res = await axiosSecure.post('/payments', payment)
                console.log(res)
                if (res.data?.result?.insertedId) {
                    setInvoice(true)
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Payment Successfull",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        }
    }

    return (
        <form className='w-4/5 mx-auto' onSubmit={handleSubmit}>
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
            <button className='btn btn-outline btn-primary mt-5' type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay
            </button>
            <Link
            state={{ transactionIDs:transactionID }}
             to="/invoice">
                <button
                className='btn btn-outline btn-secondary mt-5 ml-3' type="submit"
                    disabled={!invoice}
                >
                    Get Invoice
                </button>
            </Link>
            <p className='text-red-600 mt-1'>{error}</p>
            {/* {
                transactionID && <p className='text-green-500'>{transactionID}</p>
            } */}
        </form>
    );
};

export default CheckoutForm;