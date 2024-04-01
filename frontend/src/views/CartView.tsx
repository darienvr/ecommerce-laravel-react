import React, { useState, useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { ContextType } from '../types';
import axiosClient from '../axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const CartView = () => {
    const { cart, setCart } = useStateContext() as ContextType;
    const [productDetails, setProductDetails] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       
        const fetchProductDetails = async () => {
            const promises = cart.map((item) =>
                axiosClient.get(`/product/${item.product_id}`).then((response: any) => {
                    console.log(response.data.data);
                    return response.data.data;
                })
            );

            const details = await Promise.all(promises);
            setProductDetails(details);
            setLoading(false)
        };

        fetchProductDetails();
    }, [cart]);



    const totalPrice = productDetails.reduce((total, product) => {
        const cartItem = cart.find((item) => item.product_id === product.id);
        return total + (product.price * (cartItem ? cartItem.amount : 0));
    }, 0);

    const handleDelete = (id: string) => {
        setCart(cart.filter(item => item.product_id !== id));
    };

    return (
        <>
            <Navbar />
            <div className='mt-10 w-[43%] mx-auto'>
                {loading ? (
                    <div className='text-5xl text-center font-semibold'>LOADING...</div>
                ) : (
                    <>
                        {productDetails.map((product) => {
                        const cartItem = cart.find((item) => item.product_id === product.id);
                        return (
                            <div key={product.id}>
                                <div  className='flex justify-between items-center my-5 text-lg'>
                                    <div className='flex gap-3 items-center'>
                                        <img className='w-[130px] rounded-sm h-28' src={product.image} alt="" />
                                        <div>
                                            <h1 className='font-semibold'>{product.name}</h1>
                                            <p className='text-gray-500 text-sm'>Quantity: {cartItem ? cartItem.amount : 0}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className='font-bold'>S./ {product.price}</p>
                                        <button onClick={() => handleDelete(product.id)} className='text-red-500'>Delete</button>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        );
                    })}
                    <div className='flex justify-between my-5 items-center'>
                        <Link className='border-gray-900 border-2 rounded-md px-3 py-1' to='/'>Continue Shopping</Link>
                        <h1 className='text-xl font-semibold'>Order Total: S./{totalPrice}</h1>
                    </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartView;
