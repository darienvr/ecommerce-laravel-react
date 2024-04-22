import { useStateContext } from '../contexts/ContextProvider'
import { ContextType } from '../types';
import Navbar from '../components/Navbar';
import ProductsList from '../components/ProductsList';

function ProductsView() {

    const { categories, handleCategory, selectCategory } = useStateContext() as ContextType;

    const onSubmit = (e:any) => {
        e.preventDefault()
        alert('Click in Input Button')
    }

  return (
    <>
        <Navbar />
        <div className='bg-gray-100 min-h-[100vh]'>
            <div className='flex w-[90%] mx-auto pt-5'>
                <div className='w-[25%]'>
                    <div className='p-5'>
                        <h1 className='text-xl font-semibold pb-3'>Search Product</h1>
                        <form  onSubmit={(e)=>onSubmit(e)} className='flex items-center'>
                            <input className='pl-1 shadow-md bg-gray-200 rounded-l-md w-[85%] h-[35px] border' type="text" />
                            <button type='submit' className='shadow-md mx-auto w-[15%] h-[35px] flex justify-center items-center rounded-r-md border  hover:bg-slate-200 transition-colors'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className='p-5'>
                        <h1 className='text-xl font-semibold pb-3'>Category</h1>
                        <div className='flex flex-col'>
                        {categories.map(category => (
                            <button onClick={()=>handleCategory(category.id)} className={`py-1 hover:font-semibold w-fit text-lg ${selectCategory === category.id ? 'font-semibold underline' : ''}`} key={category.id}>{category.category}</button>
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
