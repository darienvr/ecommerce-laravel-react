import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../contexts/ContextProvider'
import { ContextType, Product } from '../types';
import Navbar from '../components/Navbar';


function ProductsView() {

    const { categories, filterProducts, handleCategory, addCart, cart } = useStateContext() as ContextType;

    const navigate = useNavigate(); 

    const onClick = (id:Product['id']) => {
        navigate(`/product/${id}`)
    }

  return (
    <>
        <Navbar />
        <div className='bg-gray-200 min-h-[100vh]'>
            <div className='flex w-[90%] mx-auto pt-5'>
                <div className='w-[25%]'>
                    <div className='p-5'>
                        <h1 className='text-2xl font-semibold pb-3'>Category</h1>
                        <div className='flex flex-col'>
                        {categories.map(category => (
                            <button onClick={()=>handleCategory(category.id)} className='py-1 hover:font-bold w-fit text-lg' key={category.id}>{category.category}</button>
                        ))}
                        </div>
                    </div>
                </div>
                <div className='w-[75%]'>
                    <div className='grid grid-cols-3 p-5 mx-auto gap-8'>
                        {filterProducts.length === 0 ? <h1>No se encontraron productos :C</h1> 
                            : <> {filterProducts.map(product=> (
                                <div key={product.id} className='border-2 shadow-lg rounded-md min-h-[350px] bg-gray-100'>
                                    <img onClick={()=>onClick(product.id)} className='h-[75%] w-[100%] cursor-pointer rounded-md' src={product.image} alt={product.name} />
                                    <div className='p-2 text-lg  flex flex-col justify-between h-[25%]'>
                                        <div className='flex justify-between'>
                                            <h3 className='font-semibold'>{product.name}</h3>
                                            <p className='text-gray-500 font-semibold'>S./{product.price}</p>
                                        </div>
                                        <button onClick={()=>addCart(product.id, 1)} className='bg-blue-500 px-3 rounded-md text-white font-semibold w-40 py-1'>Add Cart</button>
                                    </div>
                                </div>
                            ))} 
                            </> 
                        }
                    </div>
                </div>
            </div>
            <div>
                <pre>
                    {JSON.stringify(cart, null, 2)}
                </pre>
            </div>
        </div>
    </>
  )
}

export default ProductsView
