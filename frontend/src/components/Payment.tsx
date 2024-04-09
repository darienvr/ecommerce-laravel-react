import Navbar from '../components/Navbar'
import { useStateContext } from '../contexts/ContextProvider';
import { ContextType } from '../types';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axiosClient from '../axios'
import { useNavigate } from 'react-router-dom';
import imgStripe from '../assets/stripe-logo.png'

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const { totalPrice, deleteCart } = useStateContext() as ContextType;

    /*
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        const cardElement = elements?.getElement(CardElement);
    
        if (cardElement && stripe) {
          const createPaymentMethodResult: any = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
          });
    
          //! if error in creating payment
          if (createPaymentMethodResult.error) {
            return {
              paymentMethod: null,
              success: false,
              error: createPaymentMethodResult.error,
            };
          }
          //! if create payment method success
          return {
            paymentMethod: createPaymentMethodResult.paymentMethod,
            success: true,
            error: null,
          };
        }
    
        //! if stripe or card is not found
        return {
          paymentMethod: null,
          success: false,
          error: {
            message: "Something went wrong with Stripe Loading",
            code: "missing_stripe",
            type: "Stipe_load_error",
          },
        };
      };
      */

      const handleSubmit = async(e:any) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe?.createPaymentMethod({
            type: 'card',
            card: elements?.getElement(CardElement)
        })

        if(!error){
            console.log(paymentMethod)
            const {id} = paymentMethod;
            const {data} = await axiosClient.post('/checkout', {
                id,
                amount: {totalPrice}
            })

            console.log(data)
            deleteCart()
            navigate('/');
        }
      }

  return (
    <>
        <Navbar />
        <img className='mx-auto mt-5' src={imgStripe} alt="" />
        <div className='w-[40%] mx-auto border-2 shadow-lg rounded-md p-3'>
            <p className='mb-5 text-2xl font-bold'>Payment Information</p>
            <form className='flex flex-col h-fit justify-between' onSubmit={handleSubmit}>
                <CardElement />
                <p className='mx-auto my-5 text-2xl font-semibold'>Total: ${totalPrice}</p>
                <button className='bg-blue-400 px-5 py-2 rounded-md w-[50%] mx-auto'>Pay Now</button>
            </form>
        </div>
    </>
  )
}

export default Payment