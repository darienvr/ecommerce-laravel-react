import loginImg from '../assets/login.jpg'
import { Outlet } from 'react-router-dom'

const GuestLayout = () => {
    /*
    const {token} = useStateContext()
    if(token){
        return <Navigate to="/" />
    }*/


  return (
    <div id='guestLayout'>
        <div className='contenedor-form'>
            <div className='contenedor-img'>
                <img className='img-login' src={loginImg}></img>
            </div>
            <div className='contenedor-formulario animated fadeInDown'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default GuestLayout