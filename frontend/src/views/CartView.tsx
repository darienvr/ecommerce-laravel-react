import { useStateContext } from '../contexts/ContextProvider';
import { ContextType, Product } from '../types';
import axiosClient from '../axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const CartView = () => {
    const { cart, setCart, loading, productDetails, totalPrice } = useStateContext() as ContextType;
    
    const handleDelete = (id: Product['id']) => {
        setCart(cart.filter(item => item.product_id !== id));
    };

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
                        <Link className='border-gray-900 border-2 rounded-md px-3 mx-auto' to='/'>Return</Link>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className='mt-10 w-[43%] mx-auto'>
                {loading ? (
                    <div className='text-5xl text-center font-semibold'>LOADING...</div>
                ) : (
                    <>
                        {productDetails.map((product:any) => {
                        const cartItem = cart.find((item) => item.product_id === product.id);
                        return (
                            <div key={product.id}>
                                <div  className='flex justify-between items-center my-5 text-lg'>
                                    <div className='flex gap-3 items-center'>
                                        <img className='w-[130px] rounded-sm h-28' src={product.image} alt="" />
                                        <div>
                                            <h1 className='font-semibold'>{product.name}</h1>
                                            
                                            <div className='flex items-center'>
                                                <p className='text-gray-500 text-sm'>Quantity:</p>
                                                <button onClick={()=>handleDecrease(product.id)} className='border px-2 py-0 border-black rounded-sm'>-</button>
                                                <p className='mx-2'>{cartItem ? cartItem.amount : 0}</p>
                                                <button onClick={()=>handleIncrease(product.id)} className='border px-2 py-0 border-black rounded-sm'>+</button>
                                            </div> 
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
                        <h1 className='text-xl font-semibold'>SubTotal: S./{totalPrice}</h1>
                    </div>
                    <div className='flex justify-center mb-10'>
                        <Link to={'/payment'} className='bg-blue-400 px-5 py-2 rounded-md'>Proceed To Checkout</Link>
                    </div>
                    </>
                )}
            </div>
        </>
    );
};

export default CartView;
