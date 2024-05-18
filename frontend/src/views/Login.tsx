import React, {useRef, useState} from 'react';
import axiosClient from '../axios';

const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef();
    //const {setUser, setToken} = useStateContext()
    const [errors, setErrors] = useState(null);
    const [message, setMessage] = useState(null)
  
    const onSubmit = (e:any) => {
      e.preventDefault()
      const payload = {
        //email: emailRef.current.value,
        //password: passwordRef.current.value,
      }
  
      axiosClient.post('/login', payload)
        .then(({data})=> {
          setUser(data.user)
          setToken(data.token)
        })
        .catch(err=>{
          const response = err.response;
          if(response && response.status === 422){
              setErrors(response.data.errors)
              setMessage(response.data.message)
          }
        })
    }
  
    return (
      <div className=''>
          <h1 className='text-4xl font-normal'>Bienvenido</h1>
          <h5 className='text-md pb-4 font-normal'>Ingrese su cuenta</h5>
          <form onSubmit={onSubmit} className=''>
            <label className=''><b>Email</b></label> <br/>
            <input ref={emailRef} className='rounded border w-[80%] border-gray-400' type='email'></input><br/>
            
            <label className='form-label'><b>Contraseña</b></label> <br/>
            <input ref={passwordRef} className='rounded border w-[80%] border-gray-400' type='password'></input> <br/>
            
            <button className='rounded-md bg-blue-800 text-white py-1 px-4 my-3' type='submit'>Iniciar Sesion</button> <br/>
            <div className='flex'>
              <p>¿No tiene una cuenta?</p>
              <a className='text-blue-900 pl-2 hover:underline' href='/signup'>Registrarse</a>
            </div>
          </form>
      </div>
    )
}

export default Login