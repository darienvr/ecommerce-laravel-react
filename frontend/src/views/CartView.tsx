import React, { useState, useEffect } from 'react';
import { useStateContext } from '../contexts/ContextProvider';
import { ContextType } from '../types';
import axiosClient from '../axios';
import Navbar from '../components/Navbar';

const CartView = () => {
    const { cart, setCart } = useStateContext() as ContextType;
    const [productDetails, setProductDetails] = useState<any[]>([]);

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
            <div className='mt-20'>
                {productDetails.map((product) => {
                    const cartItem = cart.find((item) => item.product_id === product.id);
                    return (
                        <div key={product.id} className='flex w-[50%] mx-auto justify-between items-center mb-5'>
                            <div className='flex gap-3 items-center'>
                                <img className='w-[100px] h-20' src={product.image} alt="" />
                                <div>
                                    <h1>{product.name}</h1>
                                    <p>{product.price}</p>
                                </div>
                            </div>
                            <p>Amount: {cartItem ? cartItem.amount : 0}</p>
                            <p>Precio: {product.price * (cartItem ? cartItem.amount : 0)}</p>
                            <button onClick={() => handleDelete(product.id)} className='text-red-500'>Delete</button>
                        </div>
                    );
                })}
                <div className='mx-auto w-fit'>
                    <h1>Total Price: {totalPrice}</h1>
                </div>
            </div>
        </>
    );
};

export default CartView;
