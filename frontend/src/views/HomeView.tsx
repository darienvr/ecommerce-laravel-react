import React from 'react'
import Navbar from '../components/Navbar'
import HomeImg from '../assets/homeImg.png'
import { useStateContext } from '../contexts/ContextProvider'
import { ContextType, Product } from '../types';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {

    const { products } = useStateContext() as ContextType;
    const navigate = useNavigate(); 

    const productsHome = products.slice(0,3)

    const onClick = (id:Product['id']) => {
        navigate(`/product/${id}`)
    }

  return (
    <div className='bg-gray-100 min-h-[100vh]'>
        <Navbar />
        <div className='w-[1300px] mx-auto py-20 px-10 '>
            <main className='flex flex-row gap-10'>
                <div className='flex-1 flex flex-col justify-center gap-5'>
                    <h1 className='font-semibold text-5xl'>Title Ecommerce</h1>
                    <p className='text-lg'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, veniam! Inventore neque exercitationem ullam minus ipsum est fugit commodi repellat laboriosam sequi, vitae facilis, quasi quam. Corrupti ducimus asperiores dignissimos!</p>
                    <button className='bg-zinc-700 w-fit text-white px-5 py-3 rounded-md hover:bg-zinc-600 transition-colors'>Our Products</button>
                </div>
                <div className='flex-1 flex justify-center h-[500px]'>
                    <img className='hover:scale-105 transition-all' src={HomeImg} alt="Imagen Principal del Ecommerce" />
                </div>
            </main>
            <div>
                <h1 className='text-3xl font-semibold mb-3'>Feature Products</h1>
                <hr className='border-zinc-300' />
                <div className='flex justify-between pt-10'>
                    {productsHome.map(item=>(
                        <div onClick={()=>onClick(item.id)} key={item.id} className='w-[350px] shadow-md cursor-pointer rounded-md p-4'>
                            <div className='h-[250px] '>
                                <img className='bg-red-400 h-[100%] rounded-md' src={item.image} alt="#" />
                            </div>
                            <div className='text-center pt-4'>
                                <h1 className='font-semibold text-zinc-900 text-xl'>{item.name}</h1>
                                <p className='text-zinc-900'>${item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeView