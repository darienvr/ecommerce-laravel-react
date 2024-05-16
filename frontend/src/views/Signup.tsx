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
          <h3 className='text-xl'>Ingrese sus datos </h3>
          <form onSubmit={onSubmit} className='formulario'>
            <label className='form-label'><b>Nombre</b> </label><br/>
            <input ref={nameRef}  className='rounded w-[80%]' type='text'></input> <br/>
            <label className='form-label'><b>Email</b> </label> <br/>
            <input ref={emailRef} className='rounded w-[80%]'  type='email'></input><br/>
            <label className='form-label'><b>Contraseña</b> </label><br/>
            <input ref={passwordRef} className='rounded w-[80%]'  type='password'></input><br/>
            <label className='form-label'><b>Confirmar contraseña</b></label> <br/>
            <input ref={passwordConfirmationRef} className='rounded w-[80%]'  type='password'></input><br/>
            <button className='btn-login' type='submit'>Registrar</button>
            <div className='contenedor-registrarse'>
              <p>¿Ya tiene una cuenta?</p>
              <a className='btn-link' href='/login'>Iniciar Sesion</a>
            </div>
            
          </form>
      </div>
    )
}

export default Signup