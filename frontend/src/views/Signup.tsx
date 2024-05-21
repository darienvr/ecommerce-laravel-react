import React, {useRef, useState} from 'react';
import axiosClient from '../axios';

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
  
    //const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null);
  
    const onSubmit = (e:any) => {
      e.preventDefault()
      const payload = {
        //name: nameRef.current.value,
        //email: emailRef.current.value,
        //password: passwordRef.current.value,
        //password_confirmation: passwordConfirmationRef.current.value,
      }
   
      axiosClient.post('/signup', payload)
        .then(({data})=> {
          setUser(data.user)
          setToken(data.token)
        })
        .catch(err=>{
          const response = err.response;
          if(response && response.status === 422){
            setErrors(response.data.errors)
          }
        })
    }
  
    return (
      <div>
          <h3 className='text-xl pb-5'>Ingrese sus datos </h3>
          <form onSubmit={onSubmit} className='formulario'>
            <label className='font-semibold'>Nombre</label><br/>
            <input  className='rounded border w-[80%] border-gray-400 pl-2 h-[30px] mb-2' type='text'></input> <br/>
            <label className='font-semibold'>Email</label> <br/>
            <input className='rounded border w-[80%] border-gray-400 pl-2 h-[30px] mb-2'  type='email'></input><br/>
            <label className='font-semibold'>Contraseña</label><br/>
            <input className='rounded border w-[80%] border-gray-400 pl-2 h-[30px] mb-2'  type='password'></input><br/>
            <label className='font-semibold'>Confirmar contraseña</label> <br/>
            <input className='rounded border w-[80%] border-gray-400 pl-2 h-[30px] mb-3'  type='password'></input><br/>
            <button className='rounded-md bg-blue-800 text-white py-1 px-4 my-3 hover:bg-blue-900' type='submit'>Registrar</button>
            <div className='flex'>
              <p>¿Ya tiene una cuenta?</p>
              <a className='text-blue-900 pl-2 hover:underline' href='/login'>Iniciar Sesion</a>
            </div>
            
          </form>
      </div>
    )
}

export default Signup