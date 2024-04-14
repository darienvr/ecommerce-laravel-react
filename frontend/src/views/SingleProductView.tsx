import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../axios'
import Navbar from '../components/Navbar';
import { useStateContext } from '../contexts/ContextProvider'
import { ContextType } from '../types';

const SingleProductView = () => {

    const { addCart } = useStateContext() as ContextType;

    const {idProduct} = useParams()
    const [product, setProduct] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)
    const [count, setCount] = useState(1);

    const getProduct = (url: string) => {
        axiosClient.get(url)
            .then((response:any)=>{
                console.log(response.data.data)
                setProduct(response.data.data)
                setLoading(false)
            })
    }

    useEffect(()=>{
        getProduct(`/product/${idProduct}`)
    },[])

    const handleIncrease = () => {
        if(count>=10) return 
        setCount(prev=>prev+1);
    }

    const handleDecrease = () => {
        if(count<=1) return 
        setCount(prev=>prev-1);
    }   

    const {id, name, image, price, description} = product;

    return (
        <>
            <Navbar />
            <div className='h-[89vh] bg-gray-200 pt-16'>
                {loading && <div className='text-center text-5xl font-bold'>CARGANDO...</div> }
                {!loading && 
                    <>
                        <div className='grid grid-cols-2 w-[70%] mx-auto gap-10 bg-white shadow-lg rounded-md'>
                            <img className='h-[500px] w-[100%] rounded-l-md' src={image} alt={name} />
                            <div className='flex flex-col justify-center gap-5'>
                                    <h1 className='text-5xl font-semibold'>{name}</h1>
                                    <h3 className='text-2xl text-gray-600 font-semibold'>${price}</h3>
                                    <p>{description}</p>
                                    <div className='flex items-center text-2xl'>
                                        <button onClick={()=>handleDecrease()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                        <p className='p-2'>{count}</p>
                                        <button onClick={()=>handleIncrease()}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                    </div> 
                                    <button onClick={()=>addCart(id, count)} className='bg-zinc-700 px-8 rounded-md text-white text-sm font-semibold w-fit py-2 flex gap-2'>Add Cart <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                    </button>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <Link to={'/home'} className='my-5 py-2 px-5 rounded-md text-orange-600 text-xl font-semibold flex gap-2 hover:underline'>Back To Product <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                            </Link>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default SingleProductView