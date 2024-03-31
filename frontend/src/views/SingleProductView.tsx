import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import axiosClient from '../axios'
import Navbar from '../components/Navbar';

const SingleProductView = () => {

    const {id} = useParams()
    const [product, setProduct] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true)

    const getProduct = (url: string) => {
        axiosClient.get(url)
            .then((response:any)=>{
                console.log(response.data.data)
                setProduct(response.data.data)
                setLoading(false)
            })
    }

    useEffect(()=>{
        getProduct(`/product/${id}`)
    },[])

    const {name, image, price, description} = product;

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