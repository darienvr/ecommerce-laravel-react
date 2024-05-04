import { Link } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider'
import { ContextType } from '../types';


const Navbar = () => {

    const { cart } = useStateContext() as ContextType;

    const totalAmount = cart.reduce((acc, item)=>acc + item.amount, 0);

  return (
    <nav className='bg-zinc-800 h-20 text-white flex items-center'>
            <div className='flex justify-between w-[90%] mx-auto text-xl'>
                <div>
                    <Link className='font-bold' to='/home'>ECOMMERCE</Link>
                </div>
                <div className='flex gap-10 text-base items-center'>
                    <Link to='/home'>Home</Link>
                    <Link to='/products'>Products</Link>
                    <Link to={'/cart'} className='flex items-center relative gap-1'>Cart
                        <p className='absolute -right-2 -top-2 text-black bg-gray-200 rounded-[50%] w-5 h-5 flex items-center justify-center font-semibold text-sm'>{totalAmount}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                    </Link>
                    <Link to='/orders'>Orders</Link>
                </div>
                <div>
                    <Link to='/login' className='flex items-center text-base'>Login
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                            </svg>
                    </Link>
                </div>
            </div>
    </nav>
  )
}

export default Navbar