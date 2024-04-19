import React from 'react'
import Navbar from '../components/Navbar'
import HomeImg from '../assets/homeImg.png'

const HomeView = () => {
  return (
    <div className='bg-gray-100 h-[100vh]'>
        <Navbar />
        <div className='w-[1440px] mx-auto py-20 px-10'>
            <main className='flex flex-row gap-10'>
                <div className='flex-1 flex flex-col justify-center gap-5'>
                    <h1 className='font-semibold text-5xl'>Title Ecommerce</h1>
                    <p className='text-lg'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia, veniam! Inventore neque exercitationem ullam minus ipsum est fugit commodi repellat laboriosam sequi, vitae facilis, quasi quam. Corrupti ducimus asperiores dignissimos!</p>
                </div>
                <div className='flex-1 flex justify-center h-[500px]'>
                    <img className='hover:scale-105 transition-all' src={HomeImg} alt="Imagen Principal del Ecommerce" />
                </div>
            </main>
        </div>
    </div>
  )
}

export default HomeView