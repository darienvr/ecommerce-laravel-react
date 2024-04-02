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
            <div className='h-[100vh]'>
                {loading && <div>CARGANDO...</div> }
                {!loading && 
                    
                    <div className='grid grid-cols-2 w-[80%] mx-auto pt-10 gap-10'>
                        <img className='h-[500px] w-[100%]' src={image} alt={name} />
                        <div className='flex flex-col justify-center gap-5'>
                                <h1 className='text-5xl font-semibold'>{name}</h1>
                                <h3 className='text-2xl text-gray-600 font-semibold'>S./ {price}</h3>
                                <p>{description}</p>
                                <div className='flex items-center'>
                                    <button onClick={()=>handleDecrease()} className='border p-2 border-black rounded-sm'>-</button>
                                    <p className='p-2'>{count}</p>
                                    <button onClick={()=>handleIncrease()} className='border p-2 border-black rounded-sm'>+</button>
                                </div> 
                                <button onClick={()=>addCart(id, count)} className='w-fit px-5 py-2 rounded-md bg-orange-500'>Add Cart</button>
                        </div>
                    </div>
                }
                <div className='flex justify-center'>
                    <Link to={'/home'} className='my-5 py-2 px-5 rounded-md bg-yellow-300 text-white font-semibold '>Home</Link>
                </div>
            </div>
        </>
    )
}

export default SingleProductView