import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider'
import { ContextType, Product } from '../types';

const ProductsList = () => {

    const { filterProducts, addCart} = useStateContext() as ContextType;

    const [listView, setListView] = useState(false)

    const navigate = useNavigate(); 

    const onClick = (id:Product['id']) => {
        navigate(`/product/${id}`)
    }

  return (
    <>
        <div className='flex justify-between pt-5 pl-5 items-center gap-4'>
                        <h3 className='text-nowrap text-xl'>{filterProducts.length} Products Found</h3>
                        <div className='border border-3 border-gray-300 h-0 w-[100%]'></div>
                        <div className='flex gap-2'>
                            <button onClick={()=>setListView(true)} className={`border-1 border-black rounded-md p-1 ${listView ? 'bg-zinc-700 border-gray-100' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path className={`${listView ? 'text-white' : ''}`} strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                            </button>
                            <button onClick={()=>setListView(false)} className={`border-1 border-black rounded-md p-1 ${!listView ? 'bg-zinc-700 border-gray-100' : ''}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path className={`${!listView ? 'text-white' : ''}`} strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className={`${listView ? 'grid-cols-1' : 'grid-cols-3'} grid pt-5 pl-5 mx-auto gap-3`}>
                        {filterProducts.length === 0 
                            ? <h1>Sorry, no products matched your search.</h1> 
                            : <> {filterProducts.map(product=> (
                                <div key={product.id}>
                                    {listView ? 
                                    <div  className='border-2 shadow-lg rounded-md h-[190px] bg-gray-100 w-[100%] flex'>
                                        <div className='min-w-[200px] h-auto cursor-pointer rounded-md py-2 pl-2'>
                                            <img className='w-full h-full rounded-md' onClick={()=>onClick(product.id)}  src={product.image} alt={product.name} />
                                        </div>
                                        <div className='flex flex-col justify-between p-5'>
                                            <h1 className='font-semibold text-xl'>{product.name}</h1>
                                            <h2>${product.price}</h2>
                                            <p>{product.description}</p>
                                            <button onClick={()=>addCart(product.id, 1)} className='bg-zinc-700 px-8 rounded-md text-white text-sm font-semibold w-fit py-2'>Add Cart</button>
                                        </div>
                                    </div> 
                                    : <div className='border-2 shadow-lg rounded-md h-[330px] bg-gray-100 w-[100%] p-2'>
                                        <div className='h-[75%] w-[100%] cursor-pointer rounded-t-md'>
                                            <img className='w-full h-full rounded-t-md hover:scale-95 transition-all' onClick={()=>onClick(product.id)}  src={product.image} alt={product.name} />
                                        </div>
                                        <div className='text-lg  flex flex-col justify-around h-[25%]'>
                                            <div className='flex justify-between'>
                                                <h3 className='font-semibold'>{product.name}</h3>
                                                <p className='text-gray-500 font-semibold'>${product.price}</p>
                                            </div>
                                            <button onClick={()=>addCart(product.id, 1)} className='bg-zinc-700 px-8 rounded-md text-white text-sm font-semibold w-fit py-2'>Add Cart</button>
                                        </div>
                                    </div>}
                                </div>
                            ))} 
                            </> 
                        }
                    </div>
    </>
  )
}

export default ProductsList
