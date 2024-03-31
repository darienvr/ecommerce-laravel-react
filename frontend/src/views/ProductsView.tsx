import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider'
import { ContextType } from '../types';
import Navbar from '../components/Navbar';


function ProductsView() {

    const { categories, filterProducts, handleCategory, addCart, cart } = useStateContext() as ContextType;

    const navigate = useNavigate(); 

    const onClick = (id:string) => {
        navigate(`/product/${id}`)
    }

  return (
    <>
        <Navbar />
        <h1 className='font-semibold text-4xl text-center py-5'>ECOMMERCE - LARAVEL | REACT</h1>
        <div className='flex gap-5 justify-center pt-3 pb-10'>
          {categories.map(category => (
            <button onClick={()=>handleCategory(category.id)} className='rounded-md border-2 px-4 border-gray-300 bg-gray-100 hover:bg-gray-200' key={category.id}>{category.category}</button>
          ))}
        </div>
        <div className='grid grid-cols-3 w-4/5 mx-auto gap-8 my-3'>
            {filterProducts.map(product=> (
                <div key={product.id} className='border-2 shadow-lg rounded-md min-h-[400px] '>
                    <img onClick={()=>onClick(product.id)} className='h-[85%] w-[100%] cursor-pointer' src={product.image} alt={product.name} />
                    <div className='px-2 items-center text-lg h-[15%]'>
                        <div className='flex justify-between'>
                            <h3 className='font-bold'>{product.name}</h3>
                            <p className='text-gray-500 font-semibold'>S./{product.price}</p>
                        </div>
                        <button onClick={()=>addCart(product.id)} className='bg-orange-400 px-3 rounded-md text-white font-semibold'>Add Cart</button>
                    </div>
                </div>
            ))}
        </div>

        <div>
            <pre>
                {JSON.stringify(cart, null, 2)}
            </pre>
        </div>
    </>
  )
}

export default ProductsView
