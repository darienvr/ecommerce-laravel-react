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
          <h1 className='text-2xl font-semibold'>Bienvenido</h1>
          <h5 className='text-xl pb-4'>Ingrese su cuenta</h5>
          <form onSubmit={onSubmit} className=''>
            <label className='form-label'><b>Email</b></label> <br/>
            <input ref={emailRef} className='rounded w-[80%]' type='email'></input><br/>
            
            <label className='form-label'><b>Contraseña</b></label> <br/>
            <input ref={passwordRef} className='rounded w-[80%]' type='password'></input> <br/>
            
            <button className='border-2 bg-blue-700 text-white' type='submit'>Iniciar Sesion</button> <br/>
            <div className=''>
              <p>¿No tiene una cuenta?</p>
              <a className='underline' href='/signup'>Registrarse</a>
            </div>
          </form>
      </div>
    )
}

export default Login