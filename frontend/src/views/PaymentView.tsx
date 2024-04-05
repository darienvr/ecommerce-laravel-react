
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ChildComponent from '../components/Payment'

const stripePromise = loadStripe('pk_test_51P1XL9RroS5UD5gRhSraSNyZusru3WEZM3iTBITOENCc98XbWpNBeNM7jV7hR5iEnuJkr41JGIJkZkx2J9VoZ2kH00asxq1xF2');


const PaymentView= () => (
        <Elements stripe={stripePromise}>
          <ChildComponent />
        </Elements>
);


export default PaymentView