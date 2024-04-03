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
                    <p>Logo</p>
                </div>
                <div className='flex gap-10'>
                    <Link to={'/cart'}>Cart ({totalAmount})</Link>
                    <p>Login</p>
                </div>
            </div>
    </nav>
  )
}

export default Navbar