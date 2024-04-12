import { useStateContext } from '../contexts/ContextProvider'
import { ContextType } from '../types';
import Navbar from '../components/Navbar';
import ProductsList from '../components/ProductsList';

function ProductsView() {

    const { categories, handleCategory } = useStateContext() as ContextType;

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
                            <button onClick={()=>handleCategory(category.id)} className='py-1 hover:font-semibold w-fit text-lg' key={category.id}>{category.category}</button>
                        ))}
                        </div>
                    </div>
                </div>
                <div className='w-[75%]'>
                    <ProductsList />
                </div>
            </div>
        </div>
    </>
  )
}

export default ProductsView
