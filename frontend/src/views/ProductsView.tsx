import axiosClient from '../axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductsView() {

    const [categories, setCategories] = useState<any[]>([])
    const [products, setProducts] = useState<any[]>([])

    const navigate = useNavigate(); 

    const getProducts = (url: string) => {
        axiosClient.get(url)
            .then((response:any)=>{
                console.log(response.data.data)
                setProducts(response.data.data)
            });
    };

    const getCategories = (url: string) => {
        axiosClient.get(url)
            .then((response:any)=>{ 
                console.log(response.data.categories);
                setCategories(response.data.categories);
            });
    };

    useEffect(()=>{
        getCategories('/category');
        getProducts('/product')
    },[])

    const onClick = (id:any) => {
        navigate(`/product/${id}`)
    }

  return (
    <>
        <h1 className='font-semibold text-4xl text-center py-5'>ECOMMERCE - LARAVEL | REACT</h1>
        <div className='flex gap-5 justify-center pt-3 pb-10'>
          {categories.map(category => (
            <button className='rounded-md border-2 px-4 border-gray-300 bg-gray-100 hover:bg-gray-200' key={category.id}>{category.category}</button>
          ))}
        </div>
        <div className='grid grid-cols-3 w-4/5 mx-auto gap-8 my-3'>
            {products.map(product=> (
                <div onClick={()=>onClick(product.id)} key={product.id} className='border-2 shadow-lg rounded-md min-h-[400px] cursor-pointer'>
                    <img className='h-[90%]' src={product.image} alt={product.name} />
                    <div className='flex justify-between px-2 items-center text-lg h-[10%]'>
                        <h3 className='font-bold'>{product.name}</h3>
                        <p className='text-gray-500 font-semibold'>{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
  )
}

export default ProductsView
