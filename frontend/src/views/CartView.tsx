import { useStateContext } from '../contexts/ContextProvider';
import { ContextType, Product } from '../types';
import axiosClient from '../axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const CartView = () => {
    const { cart, setCart, loading, productDetails, totalPrice, deleteCart } = useStateContext() as ContextType;
    
    const handleDelete = (id: Product['id']) => {
        setCart(cart.filter(item => item.product_id !== id));
    };

    const totalAmount = cart.reduce((acc, item)=>acc + item.amount, 0);

    const handleIncrease = (id:Product['id']) => {
        setCart((prev:[]) => {
            const cartItem = cart.find((item) => item.product_id === id);
            if (cartItem && cartItem.amount < 10) {
                return prev.map((item: any) =>
                    item.product_id === id ? { ...item, amount: item.amount + 1 } : item
                );
            }
            return prev
        });
    }

    const handleDecrease = (id:Product['id']) => {
        setCart((prev:[]) => {
            const cartItem = cart.find((item) => item.product_id === id);
            if (cartItem && cartItem.amount > 1) {
                return prev.map((item:any)=>
                    item.product_id === id ? { ...item, amount: item.amount - 1 } : item
                );
            }
            return prev
        });
    } 

    if(productDetails.length === 0){
        return(
            <>
                <Navbar />
                <div className='mt-10 w-fit mx-auto'>
                    <div className='text-5xl text-center font-semibold pb-5'>Your cart is empty</div>
                    <hr className='mb-5'/>
                    <div className='flex items-center'>
                        <Link className='rounded-md px-4 py-2 bg-orange-500 text-white font-semibold mx-auto flex gap-2' to='/'>Back To Product <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg></Link>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className='bg-gray-100 h-[100vh]'>
            <Navbar />
            <div className='mt-10 w-[70%] mx-auto'>
                {loading ? (
                    <div className='text-5xl text-center font-semibold'>LOADING...</div>
                ) : (
                    <div className='flex'>
                        <div className='w-[60%] px-10'>
                            {productDetails.map((product:any) => {
                            const cartItem = cart.find((item) => item.product_id === product.id);
                            return (
                                <div key={product.id}>
                                    <div  className='flex justify-between items-center my-5 text-lg'>
                                        <div className='flex gap-3 items-center'>
                                            <img className='w-[120px] rounded-md h-28' src={product.image} alt="" />
                                            <div className='flex flex-col gap-2'>
                                                <h1 className='font-semibold'>{product.name}</h1>
                                                <div className='flex items-center gap-3'>
                                                    <p className='text-gray-500 text-sm'>Quantity: </p>
                                                    <div className='flex'>
                                                        <button onClick={()=>handleDecrease(product.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-7 h-7">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        </button>
                                                        <p className='mx-2'>{cartItem ? cartItem.amount : 0}</p>
                                                        <button onClick={()=>handleIncrease(product.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-7 h-7">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                        </svg>
                                                        </button>
                                                    </div>
                                                </div> 
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-center gap-2'>
                                            <p className='font-semibold'>${product.price}</p>
                                            <button onClick={() => handleDelete(product.id)} className='text-red-500'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <hr/>
                                </div>
                            );
                            })}
                            <div className='flex justify-between my-5 items-center'>
                                <Link className='rounded-md px-4 py-2 bg-zinc-700 text-gray-100 font-semibold' to='/products'>Continue Shopping</Link>
                                <Link onClick={deleteCart} className='rounded-md px-4 py-2 text-red-500 font-semibold hover:underline' to='/cart'>Clear Shopping Cart</Link>
                            </div>
                            
                        </div>
                        <div className='w-[40%]'>
                            <div className='border h-fit w-[75%] mx-auto my-5 flex flex-col justify-between p-3 rounded-md border-black'>
                                <h1 className='font-bold pb-5'>ORDER SUMARY</h1>
                                <span className='flex justify-between'>
                                    <h3>Subtotal</h3><p>${totalPrice}</p>
                                </span>
                                <hr/>
                                <span className='flex justify-between'>
                                    <h3>Shipping</h3><p>$5</p>
                                </span>
                                <hr/>
                                <span className='flex justify-between'>
                                    <h3>Tax</h3><p>${totalAmount*18}</p>
                                </span>
                                <hr/>
                                <span className='flex justify-between pt-5'>
                                    <h2 className='font-semibold'>Order Total</h2><p>${totalPrice}</p>
                                </span>
                            </div>
                            <div className='flex justify-center mb-10'>
                                <Link to={'/payment'} className='bg-blue-600 px-5 py-2 rounded-md text-white flex gap-2'>Proceed To Checkout <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartView;
