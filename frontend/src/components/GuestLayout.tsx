import loginImg from '../assets/login.jpg'
import { Outlet } from 'react-router-dom'

const GuestLayout = () => {
    /*
    const {token} = useStateContext()
    if(token){
        return <Navigate to="/" />
    }*/


  return (
    <div className='h-[100vh] flex items-center justify-center'>
        <div className='w-[1000px] flex items-center bg-blue-300'>
            <div className='w-[50%]'>
                <img className='rounded' src={loginImg}></img>
            </div>
            <div className='p-5 w-[50%]'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default GuestLayout