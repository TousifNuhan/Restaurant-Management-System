import React from 'react';
import SelectedTitle from '../../Shared/SelectedTitle/SelectedTitle';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_PK)

const Payment = () => {
    return (
        <div>
            <SelectedTitle
                subHeading="Complete your Payment"
                heading="PAYMENT"
            ></SelectedTitle>
            <Elements stripe={stripePromise}>
                <CheckoutForm></CheckoutForm>
            </Elements>

        </div>
    );
};

export default Payment;